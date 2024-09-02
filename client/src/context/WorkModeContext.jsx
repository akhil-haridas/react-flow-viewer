import React, { createContext, useContext, useState } from 'react';

// Create a context with default value `false`
const WorkModeContext = createContext();

export const WorkModeProvider = ({ children }) => {
  const [isWorkMode, setIsWorkMode] = useState(false);

  return (
    <WorkModeContext.Provider value={{ isWorkMode, setIsWorkMode }}>
      {children}
    </WorkModeContext.Provider>
  );
};

// Custom hook to use the WorkModeContext
export const useWorkMode = () => useContext(WorkModeContext);
