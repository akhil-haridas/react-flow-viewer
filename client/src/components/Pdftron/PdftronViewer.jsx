import WebViewer from "@pdftron/webviewer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWorkMode } from "../../context/WorkModeContext";

const PdftronViewer = () => {
    const [instance, setInstance] = useState(null);
    const viewer = useRef(null);
    const { setSelectedAnnotations } = useWorkMode();

    const saveAnnotations = async (annotationManager) => {
        const annotationsJSON = await annotationManager.exportAnnotations();
        localStorage.setItem("annotations", JSON.stringify(annotationsJSON));
    };

    const initializeViewer = useCallback(async () => {
        if (instance) return;
        if (viewer.current) {
            try {
                WebViewer(
                    {
                        path: "/webviewer",
                        licenseKey: "your_license_key_here",
                        initialDoc:
                            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
                    },
                    viewer.current
                ).then(async (instance) => {
                    if (instance) {
                        setInstance(instance);
                        const { documentViewer, annotationManager } = instance.Core;

                        documentViewer.addEventListener("documentLoaded", async () => {
                            const storedAnnotations = localStorage.getItem("annotations");
                            if (storedAnnotations) {
                                const annotations = JSON.parse(storedAnnotations);
                                await annotationManager.importAnnotations(annotations);
                            }
                        });

                        annotationManager.addEventListener("annotationChanged", (annotations, action) => saveAnnotations(annotationManager));
                        annotationManager.addEventListener("annotationSelected", (annotations) => { setSelectedAnnotations(annotationManager.getSelectedAnnotations()) });
                    }
                });
            } catch (error) {
                console.error("Error initializing WebViewer:", error);
            }
        }
    }, [instance]);

    useEffect(() => {
        initializeViewer();
    }, [initializeViewer]);

    return (
        <div
            className="webviewer"
            ref={viewer}
            style={{ height: "calc(100% - 48px)", width: "100%" }}
        />
    );
};

export default PdftronViewer;
