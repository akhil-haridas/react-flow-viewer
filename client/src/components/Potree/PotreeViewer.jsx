import React, { useEffect, useRef, useCallback } from "react";
import { useWorkMode } from "../../context/WorkModeContext";

const Potree = window.Potree;

const PotreeViewer = ({ cloudUrl }) => {
  const { isWorkMode } =
    useWorkMode();

  const potreeContainerDiv = useRef(null);
  const viewerInitialized = useRef(false);

  const initializeViewer = useCallback(() => {
    if (potreeContainerDiv.current && !viewerInitialized.current) {
      viewerInitialized.current = true;
      const viewerElem = potreeContainerDiv.current;
      const viewer = new Potree.Viewer(viewerElem);

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.setClipTask(Potree.ClipTask.SHOW_INSIDE);
      viewer.loadSettingsFromURL();
      viewer.setControls(viewer.orbitControls);

      viewer.loadGUI(() => {
        viewer.setLanguage("en");
        viewer.toggleSidebar();
      });

      Potree.loadPointCloud(cloudUrl)
        .then((e) => {
          const pointcloud = e.pointcloud;
          const material = pointcloud.material;

          material.activeAttributeName = "rgba";
          material.minSize = 2;
          material.pointSizeType = Potree.PointSizeType.FIXED;

          viewer.scene.addPointCloud(pointcloud);
          viewer.fitToScreen();
        })
        .catch((e) => console.error("ERROR: ", e));
    }
  }, [cloudUrl]);

  useEffect(() => {
    initializeViewer();
  }, [initializeViewer]);

  return (
    <div
      className="potree_container"
      style={{
        position: "absolute",
        width: "100%",
        height: "calc(100% - 46px)",
        display: "flex",
        justifyContent: "center",
        borderRadius: "0 0 12px 12px",
        overflow:"hidden"
      }}
    >
      <div id="potree_render_area" ref={potreeContainerDiv}></div>
      {isWorkMode && (
        <div
          id="potree_sidebar_container"
          style={{ left: "0", zIndex: "100" }}
        ></div>
      )}
    </div>
  );
};

export default React.memo(PotreeViewer);
