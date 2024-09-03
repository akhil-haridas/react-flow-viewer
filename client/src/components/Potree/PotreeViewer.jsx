import React, { useEffect, useRef, useCallback } from "react";
import { useWorkMode } from "../../context/WorkModeContext";

const Potree = window.Potree;

const PotreeViewer = ({ cloudUrl }) => {
  const { isWorkMode, setIsWorkMode, viewerType, setViewerType } = useWorkMode();

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

  const onToggleCheckbox = (e) => {
    setIsWorkMode(e.target.checked);
    setViewerType("PotreeViewer")
  }

  return (
    <div
      className="potree_container"
      style={{
        position: "absolute",
        width: "98%",
        height: "94%",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <label className="check-1" style={{ position: "absolute", left: '0', zIndex: "99" }}>
        <input type="checkbox" checked={isWorkMode} onChange={onToggleCheckbox} />
        <div className="inner"></div>
        <div className="bullet"></div>
      </label>
      <div id="potree_render_area" ref={potreeContainerDiv}></div>
    </div>
  );
};

export default React.memo(PotreeViewer);
