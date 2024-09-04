import React, { createContext, useContext, useState } from "react";

const WorkModeContext = createContext();

export const WorkModeProvider = ({ children }) => {
  const [isWorkMode, setIsWorkMode] = useState(false);
  const [viewerType, setViewerType] = useState(null);

  return (
    <WorkModeContext.Provider
      value={{ isWorkMode, setIsWorkMode, viewerType, setViewerType }}
    >
      {children}
    </WorkModeContext.Provider>
  );
};

export const useWorkMode = () => useContext(WorkModeContext);
