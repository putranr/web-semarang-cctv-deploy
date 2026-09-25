// ======================================================
// MAIN.TSX
// ======================================================
// File ini adalah titik awal aplikasi React.
// React akan mulai menjalankan website dari file ini.
// ======================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import CSS global
import "./index.css";

// Import component utama website
import App from "./App";

// Menjalankan aplikasi React di element dengan id="root"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

