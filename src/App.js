import { Layer, Stage } from "react-konva";
import "./App.css";
import Birdy from "./components/Birdy";
import Widget from "./components/Widget";
import SoccerPitch from "./components/layers/SoccerPitchLayer";

function App() {
  return (
    <div className="App">
      <img
        width="200px"
        className="dv-merch-logo"
        src="https://m.media-amazon.com/images/G/01/digital/video/New_MLP/MLP_AVLogo_300x80.png"
        alt="Prime Video"
      ></img>
      <Birdy />
      <Widget />
    </div>
  );
}

export default App;
