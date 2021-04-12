import Normalize from "react-normalize";
import { GlobalStyle } from "./components/AppStyle.js";
import DrumMachine from "./components/DrumMachine.js";

function App() {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <DrumMachine />
    </>
  );
}

export default App;
