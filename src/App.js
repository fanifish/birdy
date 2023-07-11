import { Layer, Stage } from "react-konva";
import "./App.css";
import Birdy from "./components/Birdy";
import Widget from "./components/Widget";
import {Input, Modal} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const viewState = useSelector((state) => state.view);
  
  return (
    <div className="App">
      <div className="absolute z-20 w-screen bottom-0 h-[50px] bg-gradient-to-t from-black" />
      <div className="absolute z-20 w-screen pt-3 pb-4 pl-4 pr-4 bg-gradient-to-b from-black via-black flex text-slate-200 items-center gap-4">
        <img
          width="150px"
          className="dv-merch-logo"
          src="https://m.media-amazon.com/images/G/01/digital/video/New_MLP/MLP_AVLogo_300x80.png"
          alt="Prime Video"
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
      <Modal isOpen={viewState.modalOpen} size="xl">
        <div className="bg-neutral-950 border-2 border-slate-700 p-4 rounded-lg">
          <Widget />
        </div>
      </Modal>
    </div>
  );
}

export default App;
