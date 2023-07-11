import { Layer, Stage } from "react-konva";
import "./App.css";
import Birdy from "./components/Birdy";
import SoccerPitch from "./components/layers/SoccerPitchLayer";

function App() {
  return (
    <div className="App">
      <img
        width="200px"
        class="dv-merch-logo"
        src="https://m.media-amazon.com/images/G/01/digital/video/New_MLP/MLP_AVLogo_300x80.png"
        alt="Prime Video"
      ></img>
      <Birdy />
      <Stage width={1000} height={600}>
        <Layer width={1000} height={600}>
          <SoccerPitch width={1000} height={600} withBackground={true} />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
