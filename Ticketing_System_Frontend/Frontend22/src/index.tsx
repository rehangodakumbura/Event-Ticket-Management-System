import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// Ensure './App' matches the actual file name.
//import reportWebVitals from './reportWebVitals'; // Comment out if unused.

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: performance monitoring
//reportWebVitals(); // Remove if you deleted `reportWebVitals.ts`.
