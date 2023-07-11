import React from "react";
import { Image } from "react-konva";
import { useDispatch } from "react-redux";
import Konva from "konva";
import { updateTime, updateSize } from "../redux/slices/videoSlice";
import { updateAspectRatio } from "../redux/slices/videoSlice";
import { useWindowSize } from "@uidotdev/usehooks";

const xpos = 0;
const ypos = 0;
const pitchMargin = 100;

/**
 * Handles the logic for interactive birdy engine.
 */
function BirdyPlayer({ src, width, height }) {
  const imageRef = React.useRef(null);

  const dispatch = useDispatch();

  const { width: windowWidth } = useWindowSize();

  // we need to use "useMemo" here, so we don't create new video elment on any render
  const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = src;
    element.muted = "muted";
    console.log(element);
    return element;
  }, [src]);

  // when video is loaded, we should read it size
  React.useEffect(() => {
    const onload = function () {
      const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
      console.log(aspectRatio);
      const videoWidth = windowWidth;
      const videoHeight = videoWidth / aspectRatio;
      dispatch(updateSize({ width: videoWidth, height: videoHeight }));
    };

    videoElement.addEventListener("loadedmetadata", onload);

    videoElement.addEventListener("timeupdate", (event) => {
      dispatch(updateTime(event.timeStamp));
    });

    return () => {
      videoElement.removeEventListener("loadedmetadata", onload);
    };
  }, [videoElement, windowWidth, dispatch]);

  // use Konva.Animation to redraw a layer
  React.useEffect(() => {
    videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  }, [videoElement]);

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={xpos}
      y={ypos}
      stroke="red"
      width={width}
      height={height}
    />
  );
}

export default BirdyPlayer;
