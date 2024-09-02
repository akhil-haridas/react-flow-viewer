import React, { useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
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
    position: { x: 70, y: 166 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px"
    },
  },
  {
    id: '2',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon', viewer: "PdftronViewer" },
    position: { x: -1452, y: 1802 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px"
    },
  },
  {
    id: '3',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon', viewer: "PdftronViewer" },
    position: { x: -2650, y: 166 },
    style: {
      background: '#fff',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px"
    },
  },
];

const initialEdges = [];

const FlowWrapper = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    console.log(nodes)
  }, [nodes])
  return (
    <div className="flowWrapper">
      {/* <div className='viewerWrapper'> */}
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        className="react-flow-node-resizer-example"
        onNodesChange={onNodesChange}
        // minZoom={-100}
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
