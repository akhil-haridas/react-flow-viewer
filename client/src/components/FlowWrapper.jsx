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
    position: { x: -133.15263157894736, y: 861.9490131578948 },
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
    dragHandle: '.drag-handle',
  },
  {
    id: '2',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon', viewer: "PdftronViewer" },
    position: { x: 2059.236224113849, y: 2555.728188789856 },
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
    dragHandle: '.drag-handle',
  },
  {
    id: '3',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon', viewer: "PdftronViewer" },
    position: { x: -2332.375, y: 150.875 },
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
    dragHandle: '.drag-handle',
  },
];

const initialEdges = [];

const FlowWrapper = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    console.log(nodes)
  }, [nodes])

  const handleSelectionChange = ({ nodes, edges }) => {
  console.log('Selected nodes:', nodes);
  console.log('Selected edges:', edges);
};
  return (
    <div className="flowWrapper">
      {/* <div className='viewerWrapper'> */}
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        className="react-flow-node-resizer-example"
        onNodesChange={onNodesChange}
        minZoom={-1}
        maxZoom={4}
        fitView
        nodeTypes={nodeTypes}
        onSelectionChange={handleSelectionChange}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
      {/* </div> */}
    </div>
  );
};

export default FlowWrapper;
