import React, {useState} from "react";
import useImage from "use-image";
import {Image} from "react-konva";

import HeatMap1Image from '../../images/heatmap_1.png';
import HeatMap2Image from '../../images/heatmap_2.png';

const Heatmap = (props) => {
  const [heatMap1] = useImage(HeatMap1Image);
  const [heatMap2] = useImage(HeatMap2Image);
  
  const imageMap = {
    1: heatMap1,
    2: heatMap2
  }
  
  return (
    <Image image={imageMap[props.currentImage]} {...props} />
  )
}

export default Heatmap;