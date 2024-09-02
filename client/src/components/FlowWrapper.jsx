import React from "react";
import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomResizerNode from "./Resizer/CustomResizerNode";

const nodeTypes = {
  CustomResizerNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon', viewer: "PdftronViewer" },
    position: { x: 150, y: 150 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 100,
    },
  },
];

const initialEdges = [];

const FlowWrapper = () => {
  return (
    <div className="flowWrapper">
      {/* <div className='viewerWrapper'> */}
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        className="react-flow-node-resizer-example"
        minZoom={0.2}
        maxZoom={4}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
        <Controls />
      </ReactFlow>
      {/* </div> */}
    </div>
  );
};

export default FlowWrapper;
