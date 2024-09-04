import WebViewer from "@pdftron/webviewer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWorkMode } from "../../context/WorkModeContext";

const PdftronViewer = () => {
    const [instance, setInstance] = useState(null);
    const viewer = useRef(null);

    const initializeViewer = useCallback(async () => {
        if (instance) return;
        if (viewer.current) {
            try {
                const webinstance = await WebViewer(
                    {
                        path: "/webviewer",
                        licenseKey:
                            "demo:1721108165987:7f9a5c7b03000000007463b7c7a77a620e9c805eedc37b89008b5843ac",
                        initialDoc:
                            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
                    },
                    viewer.current
                );
                setInstance(webinstance);
            } catch (error) {
                console.error("Error initializing WebViewer:", error);
            }
        }
    }, []);

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
