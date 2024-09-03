import React, { createContext, useContext, useState } from 'react';

const WorkModeContext = createContext();

export const WorkModeProvider = ({ children }) => {
  const [isWorkMode, setIsWorkMode] = useState(false);

  return (
    <WorkModeContext.Provider value={{ isWorkMode, setIsWorkMode }}>
      {children}
    </WorkModeContext.Provider>
  );
};

export const useWorkMode = () => useContext(WorkModeContext);
