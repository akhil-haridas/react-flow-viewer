import "./App.css";

import React from "react";
import WebAudio from "./components/WebAudio";
import WebVideo from "./components/WebVideo";

// import { FlowWrapper } from "./components";

function App() {
  return (
    <div className="backgroundWrapper">
      <div className="viewerWrapper">
        {/* <FlowWrapper /> */}
        <WebAudio />
        <WebVideo />
      </div>
    </div>
  );
}

export default App;
