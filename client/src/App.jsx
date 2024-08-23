import "./App.css";

import React from "react";
import WebAudio from "./components/WebAudio";

// import { FlowWrapper } from "./components";

function App() {
  return (
    <div className="backgroundWrapper">
      <div className="viewerWrapper">
        {/* <FlowWrapper /> */}
        <WebAudio />
      </div>
    </div>
  );
}

export default App;
