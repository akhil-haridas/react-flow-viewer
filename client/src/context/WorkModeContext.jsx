import React, { createContext, useContext, useState } from "react";

const WorkModeContext = createContext();

export const WorkModeProvider = ({ children }) => {
  const [isWorkMode, setIsWorkMode] = useState(false);
  const [viewerType, setViewerType] = useState(null);
  const [selectedAnnotations, setSelectedAnnotations] = useState([]);

  return (
    <WorkModeContext.Provider
      value={{ isWorkMode, setIsWorkMode, viewerType, setViewerType, selectedAnnotations, setSelectedAnnotations }}
    >
      {children}
    </WorkModeContext.Provider>
  );
};

export const useWorkMode = () => useContext(WorkModeContext);
