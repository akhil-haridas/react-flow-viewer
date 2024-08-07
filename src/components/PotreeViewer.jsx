import React, { useCallback, useEffect, useRef } from "react";

const PotreeViewer = ({
    cloudUrl = "http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js",
}) => {
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
            style={{
                width: "600px",
                height: "400px",
            }}
        >
            <div className="potree_container">
                <div className="potree_container">
                    <div id="potree_render_area" ref={potreeContainerDiv} />
                </div>
            </div>
            <div className="ViewerTitleWrapper">
                <span>Potree viewer</span>
            </div>
        </div>
    );
};

export default PotreeViewer;
