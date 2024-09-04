import { Grid, LoaderOverlay, ViewType, Viewer } from "@xbim/viewer";
import React, { useCallback, useEffect } from "react";
import { useWorkMode } from "../../context/WorkModeContext";
const modelPath = "/models/SampleHouseV3.wexbim";
const IfcViewer = React.memo(({ idName }) => {
  const { setIsWorkMode, setViewerType } =
    useWorkMode();

  const initializeViewer = useCallback((model) => {
    const viewer = new Viewer(idName);
    const overlay = new LoaderOverlay();
    viewer.addPlugin(overlay);
    overlay.show();
    viewer.readerOptions.orderGeometryBySize = true;
    viewer.cameraProperties.fov = 53;
    // viewer.background = [0, 0, 0, 0];
    viewer.hoverPickEnabled = true;
    viewer.highlightingColour = [0, 0, 225, 200];

    var grid = new Grid();
    window.grid = grid;
    grid.zFactor = 20;
    grid.colour = [0, 0, 0, 0.8];

    viewer.addPlugin(grid);
    viewer.load(model);

    viewer.on("loaded", () => {
      viewer.start();
      overlay.hide();
      viewer.show(ViewType.DEFAULT, undefined, undefined, false);
    });
  }, []);

  useEffect(() => {
    initializeViewer(modelPath);
  }, [initializeViewer, modelPath]);

  return (
    <canvas
      id={idName}
      style={{
        width: "100%",
        height: "calc(100% - 46px)",
        borderRadius: "0 0 12px 12px",
        overflow: "hidden",
      }}
    ></canvas>
  );
});
export default IfcViewer;
