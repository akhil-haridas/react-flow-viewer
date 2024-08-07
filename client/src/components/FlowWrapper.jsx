import React, { useCallback } from "react";
import {
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlow,
    ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import PotreeViewer from "./PotreeViewer";
import PdftronViewer from "./PdftronViewer";
import IfcViewer from "./IfcViewer";

const initialNodes = [
    {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "Potree Viewer" },
        type: "Potree",
    },
    {
        id: "2",
        position: { x: 800, y: 100 },
        data: { label: "Apryse Viewer" },
        type: "Apryse",
    },
    {
        id: "3",
        position: { x: 100, y: 600 },
        data: { label: "IFC Viewer" },
        type: "Ifc",
    },
];

const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e1-3", source: "1", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e2-5", source: "2", target: "5" },
];

const nodeTypes = {
    Potree: PotreeViewer,
    Apryse: PdftronViewer,
    Ifc: IfcViewer,
};

const FlowWrapper = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
};

export default FlowWrapper;
