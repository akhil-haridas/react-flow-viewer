import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useReactFlow,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CustomResizerNode from "./Resizer/CustomResizerNode";
import { useWorkMode } from "../context/WorkModeContext";
import PdftronViewer from "./Pdftron/PdftronViewer";
import IfcViewer from "./Xbim/IfcViewer";
import PotreeViewer from "./Potree/PotreeViewer";

const nodeTypes = {
  CustomResizerNode,
};

const initialNodes = [
  {
    id: "1",
    type: "CustomResizerNode",
    data: { label: "Apryse Viewer", viewer: "PdftronViewer", resize: false },
    position: { x: -133.15263157894736, y: 861.9490131578948 },
    style: {
      background: "#fff",
      fontSize: 12,
      border: "1px solid black",
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px",
    },
    dragHandle: ".drag-handle",
  },
  {
    id: "2",
    type: "CustomResizerNode",
    data: {
      label: "IFC Viewer",
      viewer: "IfcViewer",
      resize: false,
      modelPath: "/models/SampleHouseV3.wexbim",
    },
    position: { x: 2059.236224113849, y: 2555.728188789856 },
    style: {
      background: "#fff",
      fontSize: 12,
      border: "1px solid black",
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px",
    },
    dragHandle: ".drag-handle",
  },
  {
    id: "3",
    type: "CustomResizerNode",
    data: {
      label: "Potree Viewer",
      viewer: "PotreeViewer",
      resize: false,
    },
    position: { x: -2332.375, y: 150.875 },
    style: {
      background: "#fff",
      fontSize: 12,
      border: "1px solid black",
      padding: 5,
      borderRadius: 15,
      // height: 100,
      height: "990px",
      width: "1460px",
    },
    dragHandle: ".drag-handle",
  },
];

const initialEdges = [];

const FlowWrapper = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const loadNodes = () => {
    const storedNodes = localStorage.getItem("flowNodes");
    return storedNodes ? JSON.parse(storedNodes) : initialNodes;
  };

  const loadEdges = () => {
    const storedEdges = localStorage.getItem("flowEdges");
    return storedEdges ? JSON.parse(storedEdges) : initialEdges;
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(loadNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(loadEdges);

  const [nodeCount, setNodeCount] = useState(nodes.length);
  const [selectedViewer, setSelectedViewer] = useState("Resources");

  const { screenToFlowPosition } = useReactFlow();
  const { isWorkMode, viewerType } = useWorkMode();

  useEffect(() => {
    localStorage.setItem("flowNodes", JSON.stringify(nodes));
    localStorage.setItem("flowEdges", JSON.stringify(edges));
    setNodeCount(nodes.length);
  }, [nodes, edges]);

  const handleSelectionChange = ({ nodes, edges }) => {
    console.log("Selected nodes:", nodes);
    console.log("Selected edges:", edges);
  };

  const renderWorkMode = () => {
    switch (viewerType) {
      case "PdftronViewer":
        return <PdftronViewer />;
      case "PotreeViewer":
        return (
          <PotreeViewer
            cloudUrl={
              "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js"
            }
          />
        );
      case "IfcViewer":
        return <IfcViewer modelPath={"/models/SampleHouseV3.wexbim"} />;
      default:
        return null;
    }
  };
console.log(nodeCount,nodes.length)
  const getId = () => {
    console.log("nodeCount + 2 ::", nodeCount + 2,nodeCount)
    return `${nodeCount + 2}`;
  };

  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);
console.log("selectedViewer::",selectedViewer)
  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          id: getId(),
          type: "CustomResizerNode",
          data: {
            label: selectedViewer,
            viewer: selectedViewer,
            resize: false,
          },
          style: {
            background: "#fff",
            fontSize: 12,
            border: "1px solid black",
            padding: 5,
            borderRadius: 15,
            height: "990px",
            width: "1460px",
          },
          dragHandle: ".drag-handle",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition,selectedViewer]
  );

  const handleViewerChange = (event) => {
    console.log(event.target.value,"EVALUE")
    setSelectedViewer(event.target.value);
  };

  return (
    <div className="flowWrapper">
      <div className="viewerWrapper" ref={reactFlowWrapper}>
        <div>
          <select
            value={selectedViewer || "Resources"}
            onChange={handleViewerChange}
          >
            <option value="PdftronViewer">Pdftron Viewer</option>
            <option value="IfcViewer">IFC Viewer</option>
            <option value="PotreeViewer">Potree Viewer</option>
            <option value="Resources">Resources</option>
          </select>
        </div>
        {!isWorkMode ? (
          <ReactFlow
            defaultNodes={initialNodes}
            defaultEdges={initialEdges}
            nodes={nodes}
            edges={edges}
            className="react-flow-node-resizer-example"
            onNodesChange={onNodesChange}
            minZoom={0}
            // maxZoom={4}
            fitView
            nodeTypes={nodeTypes}
            onSelectionChange={handleSelectionChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
          </ReactFlow>
        ) : (
          <>{renderWorkMode()}</>
        )}
      </div>
    </div>
  );
};

export default FlowWrapper;
