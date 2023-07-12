import React, {useEffect, useState} from "react";
import useImage from "use-image";
import {Image} from "react-konva";

import HeatMap1Image from '../../images/heatmap_1.png';
import HeatMap2Image from '../../images/heatmap_2.png';
import HeatMap3Image from '../../images/heatmap_3.png';

const Heatmap = (props) => {
  const [heatMap1] = useImage(HeatMap1Image);
  const [heatMap2] = useImage(HeatMap2Image);
  const [heatMap3] = useImage(HeatMap3Image);
  
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    setCurrentImage( currentImage => (currentImage + 1));
    console.log(currentImage);
  }, [props.currentImage])
  
  const images = [heatMap1, heatMap2, heatMap3];
  
  return (
    <Image image={images[currentImage % (images.length)]} {...props} />
  )
}

export default Heatmap;