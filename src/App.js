import { Layer, Stage } from "react-konva";
import "./App.css";
import Birdy from "./components/Birdy";
import Widget from "./components/Widget";
import SoccerPitch from "./components/layers/SoccerPitchLayer";
import {Input, Modal} from "reactstrap";
import {useState} from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="App">
      <div className="absolute z-50 w-screen pt-3 pb-4 pl-4 pr-4 bg-gradient-to-b from-black via-black flex text-slate-200 items-center gap-4">
        <img
          width="150px"
          className="dv-merch-logo"
          src="https://m.media-amazon.com/images/G/01/digital/video/New_MLP/MLP_AVLogo_300x80.png"
          alt="Prime Video"
          onClick={() => setModalOpen(!modalOpen)}
        ></img>
        <div className="flex-grow" />
        <div className="">
          <Input
            type="select"
            size="sm"
          >
            <option value={"/assets/ManCityVsManUtd.mp4"}>
              Man City vs Man Utd
            </option>
            <option value={"/assets/ArgentinaVsFrance.mp4"}>
              Argentina vs France
            </option>
          </Input>
        </div>
        <div className="flex items-end gap-2">
          <h2 className="text-md font-light uppercase">Birdy</h2>
          <p className="text-sm text-red-500 font-bold uppercase">Demo</p>
        </div>
      </div>
      <Birdy />
      <Modal isOpen={modalOpen} size="xl">
        <div className="bg-neutral-100 p-4 rounded-lg">
          <Widget />
        </div>
      </Modal>
    </div>
  );
}

export default App;
