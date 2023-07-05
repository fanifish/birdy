import React from 'react'
import { Image } from "react-konva";
import Konva from 'konva'
import store from './reducers/store';

const xpos = 0;
const ypos = 0;
const pitchMargin = 100;

/**
 * Handles the logic for interactive birdy engine.
 */
function BirdyPlayer({ src, width, height }) {

    const imageRef = React.useRef(null);

    const [size, setSize] = React.useState({ width: width, height: height});

    // we need to use "useMemo" here, so we don't create new video elment on any render
    const videoElement = React.useMemo(() => {
        const element = document.createElement("video");
        element.src = src;
        element.muted = "muted";
        return element;
    }, [src]);

    // when video is loaded, we should read it size
    React.useEffect(() => {
        const onload = function () {
            setSize({
                width: videoElement.videoWidth,
                height: videoElement.videoHeight
            });
        };
        videoElement.addEventListener("loadedmetadata", onload);
        console.log('media loaded');

        videoElement.addEventListener("timeupdate", (event) => {
            const updateTimeAction = {
                type: 'player/UpdateTime',
                payload: event.timeStamp
              }

              store.dispatch(updateTimeAction);
          });

        return () => {
            videoElement.removeEventListener("loadedmetadata", onload);
        };
    }, [videoElement]);

    // use Konva.Animation to redraw a layer
    React.useEffect(() => {
        videoElement.play();
        const layer = imageRef.current.getLayer();

        const anim = new Konva.Animation(() => { }, layer);
        anim.start();

        return () => anim.stop();
    }, [videoElement]);


    return (
        <Image
            ref={imageRef}
            image={videoElement}
            x={xpos + pitchMargin}
            y={ypos + pitchMargin}
            stroke="red"
            width={width}
            height={height}
            draggable
        />
    );

}

export default BirdyPlayer;