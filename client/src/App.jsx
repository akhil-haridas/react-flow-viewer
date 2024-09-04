import "./App.css";

import React from "react";
import { FlowWrapper } from "@components";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <ReactFlowProvider>
      <FlowWrapper />
    </ReactFlowProvider>
  );
}

export default App;
