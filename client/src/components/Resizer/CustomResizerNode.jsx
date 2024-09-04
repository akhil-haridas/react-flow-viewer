import { memo, useState } from "react";
import { Handle, Position, NodeResizeControl } from "@xyflow/react";
import PdftronViewer from "../Pdftron/PdftronViewer";
import IfcViewer from "../Xbim/IfcViewer";
import PotreeViewer from "../Potree/PotreeViewer";
import Resources from "../Resources/Resources";

const controlStyle = {
  background: "transparent",
  border: "none",
};

const CustomNode = ({ data }) => {
  const [isResize, setIsResize] = useState(false)

  const renderViwer = (type) => {
    switch (type) {
      case "PdftronViewer":
        return <PdftronViewer />;
      case "PotreeViewer":
        return <PotreeViewer cloudUrl={"http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js"} />
      case "IfcViewer":
        return <IfcViewer modelPath={data.modelPath} />;
      case "Resources":
        return <Resources />;
      default:
        return null;
    }
  };

  const onToggleCheckbox = (tool, e) => {
    if (tool === "resize") setIsResize(e.target.checked)
  }

  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        {isResize && <ResizeIcon />}
      </NodeResizeControl>

      <Handle type="target" position={Position.Left} />
      <div style={{ height: "100%" }}>
        <div className="viewerHeader">
          <span className="drag-handle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z" />
            </svg>
            {data.label}
          </span>
          <div className="toggleWrapper">
            <label className="check-1">
              <input type="checkbox" value={isResize} onChange={(e) => onToggleCheckbox("resize", e)} />
              <div className="inner"></div>
              <div className="bullet"></div>
            </label>
          </div>
        </div>
        {renderViwer(data.viewer)}
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

function ResizeIcon() {
  return (
    <div style={{ height: "20px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#ff0071"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "absolute", right: 5, bottom: 5 }}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="16 20 20 20 20 16" />
        <line x1="14" y1="14" x2="20" y2="20" />
        <polyline points="8 4 4 4 4 8" />
        <line x1="4" y1="4" x2="10" y2="10" />
      </svg>
    </div>
  );
}

export default memo(CustomNode);
