import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const PdftronViewer = () => {
    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
            {
                path: "../public",
                licenseKey:
                    "demo:1721108165987:7f9a5c7b03000000007463b7c7a77a620e9c805eedc37b89008b5843ac",
                initialDoc:
                    "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
            },
            viewer.current
        ).then((instance) => {
            const { docViewer } = instance;
            console.log("DOC_VIEWER::", docViewer);
        });
    }, []);

    return (
        <div
            className="webviewer"
            ref={viewer}
            style={{
                width: "600px",
                height: "600px",
            }}
        ></div>
    );
};

export default PdftronViewer;
