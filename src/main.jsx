import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Structure from "./Structure.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Structure />
  </StrictMode>
);
