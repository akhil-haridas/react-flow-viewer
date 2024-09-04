import React from "react";

const Resources = () => {
    const data = [
        {
            id: 1,
            name: "Resource 1",
            type: "PDF",
            size: "2 MB",
            date: "2024-09-01",
            status: "Active",
        },
        {
            id: 2,
            name: "Resource 2",
            type: "Image",
            size: "5 MB",
            date: "2024-08-28",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Resource 3",
            type: "Video",
            size: "50 MB",
            date: "2024-07-15",
            status: "Active",
        },
        {
            id: 4,
            name: "Resource 4",
            type: "Document",
            size: "1 MB",
            date: "2024-06-22",
            status: "Archived",
        },
        {
            id: 5,
            name: "Resource 5",
            type: "Spreadsheet",
            size: "3 MB",
            date: "2024-05-10",
            status: "Active",
        },
        {
            id: 6,
            name: "Resource 6",
            type: "Audio",
            size: "8 MB",
            date: "2024-04-18",
            status: "Inactive",
        },
        {
            id: 7,
            name: "Resource 1",
            type: "PDF",
            size: "2 MB",
            date: "2024-09-01",
            status: "Active",
        },
        {
            id: 8,
            name: "Resource 2",
            type: "Image",
            size: "5 MB",
            date: "2024-08-28",
            status: "Inactive",
        },
        {
            id: 9,
            name: "Resource 3",
            type: "Video",
            size: "50 MB",
            date: "2024-07-15",
            status: "Active",
        },
        {
            id: 10,
            name: "Resource 4",
            type: "Document",
            size: "1 MB",
            date: "2024-06-22",
            status: "Archived",
        },
        {
            id: 11,
            name: "Resource 5",
            type: "Spreadsheet",
            size: "3 MB",
            date: "2024-05-10",
            status: "Active",
        },
        {
            id: 12,
            name: "Resource 6",
            type: "Audio",
            size: "8 MB",
            date: "2024-04-18",
            status: "Inactive",
        },
    ];

    return (
        <div
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
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((resource) => (
                        <tr key={resource.id}>
                            <td>{resource.id}</td>
                            <td>{resource.name}</td>
                            <td>{resource.type}</td>
                            <td>{resource.size}</td>
                            <td>{resource.date}</td>
                            <td>{resource.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Resources;
