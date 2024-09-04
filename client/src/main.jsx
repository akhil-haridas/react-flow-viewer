import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WorkModeProvider } from "./context/WorkModeContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <WorkModeProvider>
    <App />
  </WorkModeProvider>
  // </StrictMode>,
);
