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
    id: "0",
    type: "CustomResizerNode",
    data: { label: "Apryse Viewer", viewer: "PdftronViewer", resize: false, id: "0", },
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
    id: "1",
    type: "CustomResizerNode",
    data: {
      label: "IFC Viewer",
      viewer: "IfcViewer",
      resize: false,
      modelPath: "/models/SampleHouseV3.wexbim",
      idName: "xBIM-viewer",
      id: "1",
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
    id: "2",
    type: "CustomResizerNode",
    data: {
      label: "Potree Viewer",
      viewer: "PotreeViewer",
      resize: false,
      id: "2",
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

const edgeStyle = {
  stroke: "#ff0072",
  strokeWidth: 10,
};

const FlowWrapper = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const loadNodes = () => {
    const storedNodes = localStorage.getItem("flowNodes");
    return storedNodes ? JSON.parse(storedNodes) : initialNodes;
  };

  const loadEdges = () => {
    const storedEdges = localStorage.getItem("flowEdges");
    return storedEdges ? JSON.parse(storedEdges) : [];
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(loadNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(loadEdges);

  const [nodeCount, setNodeCount] = useState(3);
  const [selectedViewer, setSelectedViewer] = useState("Resources");

  const { screenToFlowPosition } = useReactFlow();
  const { isWorkMode, viewerType, setIsWorkMode, setViewerType, selectedAnnotations, onDelete, setOnDelete } = useWorkMode();

  useEffect(() => {
    localStorage.setItem("flowNodes", JSON.stringify(nodes));
    localStorage.setItem("flowEdges", JSON.stringify(edges));
  }, [nodes, edges]);

  const handleSelectionChange = ({ nodes: selectedNodes }) => {
    if (selectedNodes?.length > 0) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: {
            ...node.style,
            border: selectedNodes.find((n) => n.id === node.id)
              ? "5px solid green"
              : "1px solid black",
          },
        }))
      );
    }

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
        return (
          <IfcViewer
            modelPath={"/models/SampleHouseV3.wexbim"}
            idName={"xBIM-viewer"}
          />
        );
      default:
        return null;
    }
  };

  const getId = useCallback(() => {
    setNodeCount((count) => count + 1);
    return `${nodeCount}`;
  }, [nodeCount]);

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;

    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);
    const edgeLabel = `${sourceNode?.data?.label || 'Unknown Source'} to ${targetNode?.data?.label || 'Unknown Target'}`;

    setEdges((eds) =>
      addEdge({
        ...params, animated: true, style: edgeStyle,
        label: edgeLabel,
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#ffcc00', color: '#fff', fontWeight: 700, height: "20px" },
      }, eds)
    );
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = selectedAnnotations.length === 0 ? {
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          id: id,
          type: "CustomResizerNode",
          data: {
            label: selectedViewer,
            viewer: selectedViewer,
            resize: false,
            idName:
              selectedViewer === "IfcViewer"
                ? `xBIM-viewer${getId()}`
                : "getId()",
            id: `${getId()}`,
          },
          style: {
            background: "#fff",
            fontSize: 12,
            border: "1px solid black",
            padding: 5,
            borderRadius: 15,
            height: selectedViewer === "Resources" ? "400px" : "990px",
            width: "1460px",
          },
          dragHandle: ".drag-handle",
        } : {
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          id: id,
          type: "CustomResizerNode",
          data: {
            label: "Resources",
            viewer: "Resources",
            resize: false,
            selectedAnnotations: selectedAnnotations,
            id: `${getId()}`,
          },
          style: {
            background: "#fff",
            fontSize: 12,
            border: "1px solid black",
            padding: 5,
            borderRadius: 15,
            height: "400px",
            width: "1460px",
          },
          dragHandle: ".drag-handle",
        };

        const sourceNode = nodes.find((node) => node.id === connectingNodeId.current);
        const edgeLabel =
          selectedAnnotations.length > 0
            ? `${selectedAnnotations.length} annots selected`
            : `${sourceNode?.data?.label || "Source"} to ${newNode.data.label || "Target"}`;

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            animated: true,
            style: edgeStyle,
            label: edgeLabel,
            labelBgPadding: [8, 4],
            labelBgBorderRadius: 4,
            labelBgStyle: {
              fill: "#ffcc00",
              color: "#fff",
              fontWeight: 700,
              height: "20px",
            },
          })
        );
      }
    },
    [screenToFlowPosition, selectedViewer, getId, selectedAnnotations]
  );

  const handleViewerChange = (event) => {
    setSelectedViewer(event.target.value);
  };

  const onToggleCheckbox = (tool, e) => {
    setViewerType("");
    setIsWorkMode(false);
  };

  const handleDeleteNode = useCallback((id) => {
    setOnDelete({ id: null, delete: false })
    const selectedNodes = nodes.filter(node => node.id === id);
    if (selectedNodes.length > 0) {
      const nodeToDelete = selectedNodes[0];
      setNodes(nds => nds.filter(node => node.id !== nodeToDelete.id));
      setEdges(eds => eds.filter(edge => edge.source !== nodeToDelete.id && edge.target !== nodeToDelete.id));
    }
  }, [nodes, edges, setNodes, setEdges]);

  useEffect(() => {
    if (onDelete?.delete && onDelete?.id) {
      handleDeleteNode(onDelete.id)
    }
  }, [onDelete])

  return (
    <div className="flowWrapper">
      <div className="viewerWrapper" ref={reactFlowWrapper}>
        <div className="toolbarWrapper">
          <select
            value={selectedViewer || "Resources"}
            onChange={handleViewerChange}
          >
            <option value="PdftronViewer">Pdftron Viewer</option>
            <option value="IfcViewer">IFC Viewer</option>
            <option value="PotreeViewer">Potree Viewer</option>
            <option value="Resources">Resources</option>
          </select>
          {isWorkMode && (
            <label className="check-1">
              <input
                type="checkbox"
                checked={isWorkMode}
                onChange={(e) => onToggleCheckbox(e)}
              />
              <div className="inner"></div>
              <div className="bullet"></div>
            </label>
          )}
        </div>
        {!isWorkMode ? (
          <ReactFlow
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
          <div style={{ width: "100%", height: "100%" }}>
            {renderWorkMode()}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowWrapper;
