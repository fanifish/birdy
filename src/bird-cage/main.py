import json
import os
import sys
import time

import boto3
import cv2
import numpy as np
import torch
from sklearn.cluster import KMeans

from arguments import Arguments
from elements.assets import transform_matrix, closest_color, detect_color
from elements.deep_sort import DEEPSORT
from elements.perspective_transform import Perspective_Transform
from elements.yolo import YOLO
from yolov5.utils.plots import plot_one_box

s3 = boto3.client('s3')
color_options = [[128, 0, 0], [0, 0, 128]]


def main(opt):
    # Load models
    detector = YOLO(opt.yolov5_model, opt.conf_thresh, opt.iou_thresh)
    deep_sort = DEEPSORT(opt.deepsort_config)
    perspective_transform = Perspective_Transform()

    # Video capture
    cap = cv2.VideoCapture(opt.source)
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    fps = cap.get(cv2.CAP_PROP_FPS)
    segment_length_seconds = 2

    downsample_rate = fps // opt.outputfps

    w = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    h = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

    # Save output
    if opt.save:
        output_name = opt.source.split('/')[-1]
        output_name_prefix = output_name.split('.')[0] + '_output.'
        output_name = output_name_prefix + output_name.split('.')[-1]

        output_path = os.path.join(os.getcwd(), 'inference/output')
        os.makedirs(output_path, exist_ok=True)
        output_name = os.path.join(os.getcwd(), 'inference/output', output_name)

        w = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
        h = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

        out = cv2.VideoWriter(output_name,
                              cv2.VideoWriter_fourcc(*'mp4v'),
                              opt.outputfps, (int(w), int(h)))

    frame_num = 0
    orig_frame_num = 0

    # Black Image (Soccer Field)
    bg_ratio = int(np.ceil(w / (3 * 115)))
    gt_img = cv2.imread('./inference/black.jpg')
    gt_img = cv2.resize(gt_img, (115 * bg_ratio, 74 * bg_ratio))
    gt_h, gt_w, _ = gt_img.shape

    start_time = time.time()

    while (cap.isOpened()):

        ret, frame = cap.read()
        bg_img = gt_img.copy()
        # TODO: skip to downsample to 2 fps
        should_output = frame_num % (fps * segment_length_seconds) == 0
        # if orig_frame_num % downsample_rate != 0:
        #     orig_frame_num += 1
        #     continue
        # else:
        #     orig_frame_num += 1

        if ret:
            main_frame = frame.copy()
            yoloOutput = detector.detect(frame)

            # Output: Homography Matrix and Warped image 
            if frame_num % 5 == 0:  # Calculate the homography matrix every 5 frames
                M, warped_image = perspective_transform.homography_matrix(main_frame)

            if yoloOutput:
                output = {'players': [], 'ball': None}
                # output = {
                #     'players': {i: {'iter_id': i} for i, out in enumerate(yoloOutput) if out['label'] == 'player'},
                #     'ball': None
                # }

                # Tracking
                identities = deep_sort.detection_to_deepsort(yoloOutput, frame, output)

                output['identities'] = identities

                # Attempt at color extraction improvemnt
                # player_idx = {}
                # player_count = 0
                # for i, obj in enumerate(yoloOutput):
                #     if obj['label'] == 'player':
                #         player_idx[i] = player_count
                #         player_count += 1
                # players = [obj for obj in yoloOutput if obj['label'] == 'player']
                # player_xyxy = [get_xyxy_of_obj(obj) for obj in players]
                # player_images = [main_frame[xyxy[1]:xyxy[3], xyxy[0]:xyxy[2]] for xyxy in player_xyxy]
                # color_features = [transform_player_img(image) for image in player_images]
                # max_features = max([flat_img.shape[0] for flat_img in color_features])
                # padded_color_features = [mean_color_expand(features, max_features).flatten() for features in
                #                          color_features]
                # # pdb.set_trace()
                # kmeans = KMeans(n_clusters=min(2, len(padded_color_features))).fit(padded_color_features)
                # cluster_centers = kmeans.cluster_centers_
                # player_labels = kmeans.labels_
                # cluster_colors = []
                # for cluster_center in cluster_centers:
                #     reconstructed = cluster_center.reshape(max_features, 3)
                #     cluster_colors.append(reconstructed.mean(axis=0))

                # The homography matrix is applied to the center of the lower side of the bbox.
                for i, obj in enumerate(yoloOutput):
                    xyxy = get_xyxy_of_obj(obj)
                    x_center = (xyxy[0] + xyxy[2]) / 2
                    y_center = xyxy[3]

                    if obj['label'] == 'player':
                        coords = transform_matrix(M, (x_center, y_center), (h, w), (gt_h, gt_w))
                        try:
                            cropped_player_image = main_frame[xyxy[1]:xyxy[3], xyxy[0]:xyxy[2]]
                            # cv2.imwrite('player.jpg', cropped_player_image)
                            color = detect_color(cropped_player_image)
                            # color = cluster_colors[player_labels[player_idx[i]]]
                            output['players'].append(
                                {'coords': (coords[0] / gt_w, coords[1] / gt_h),
                                 'color': color,
                                 'identity': identities[i] if i in identities else None,
                                 })
                            cv2.circle(bg_img, coords, bg_ratio + 1, color, -1)
                        except:
                            pass
                    elif obj['label'] == 'ball':
                        coords = transform_matrix(M, (x_center, y_center), (h, w), (gt_h, gt_w))
                        cv2.circle(bg_img, coords, bg_ratio + 1, (102, 0, 102), -1)
                        output['ball'] = {'coords': (coords[0] / gt_w, coords[1] / gt_h)}
                        plot_one_box(xyxy, frame, (102, 0, 102), label="ball")

                if should_output:
                    segment_num = int(frame_num // (fps * segment_length_seconds))
                    print(f'Outputting data for segment number: {segment_num}')
                    print(f'output: {output}\n')
                    json_output_name = f'{output_name_prefix}{segment_num}.json'
                    with open(
                            f'./inference/output/segments/{json_output_name}',
                            'w') as f:
                        json.dump(output, f)
                    s3.put_object(Body=json.dumps(output), Bucket='guano', Key=json_output_name)
            else:
                deep_sort.deepsort.increment_ages()

            frame[frame.shape[0] - bg_img.shape[0]:, frame.shape[1] - bg_img.shape[1]:] = bg_img

            if opt.view:
                cv2.imshow('frame', frame)
                if cv2.waitKey(1) & ord('q') == 0xFF:
                    break

            # Saving the output
            if opt.save:
                out.write(frame)

            frame_num += 1
        else:
            break

        sys.stdout.write(
            "\r[Input Video : %s] [%d/%d Frames Processed] [~%s fps]"
            % (
                opt.source,
                frame_num,
                frame_count,
                round(frame_num / (time.time() - start_time), 2)
            )
        )

    if opt.save:
        print(f'\n\nOutput video has been saved in {output_path}!')

    cap.release()
    cv2.destroyAllWindows()


def get_xyxy_of_obj(obj):
    return [obj['bbox'][0][0], obj['bbox'][0][1], obj['bbox'][1][0], obj['bbox'][1][1]]


def transform_player_img(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.reshape((img.shape[1] * img.shape[0], 3))
    return img


def mean_color_expand(flat_img, target_size):
    expansion = np.tile(flat_img.mean(axis=0), (target_size - flat_img.shape[0], 1))
    return np.concatenate((flat_img, expansion))


if __name__ == '__main__':
    opt = Arguments().parse()
    with torch.no_grad():
        main(opt)
