import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
