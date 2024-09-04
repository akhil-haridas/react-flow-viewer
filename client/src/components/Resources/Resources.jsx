import React from "react";

const Resources = ({ selectedAnnotations }) => {

    return (
        selectedAnnotations?.length > 0 ? <div
            style={{
                width: "100%",
                height: "calc(100% - 46px)",
                padding: "6px",
            }}
        >
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Tool Name</th>
                        <th>Page Number</th>
                        <th>Author</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedAnnotations.map((annotation, index) => (
                        <tr key={index}>
                            <td>{annotation.Wk}</td>
                            <td>{annotation.Subject}</td>
                            <td>{annotation.ToolName}</td>
                            <td>{annotation.PageNumber}</td>
                            <td>{annotation.e0}</td>
                            <td>{annotation.u0.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : <div>Resources</div>
    );
};

export default Resources;
