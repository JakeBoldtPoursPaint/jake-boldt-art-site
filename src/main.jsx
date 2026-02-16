import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ProductPage from "./ProductPage.jsx";
import PourSimulator from "./PourSimulator.jsx";
import "./index.css";
// 👇 use the React version, not Next
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <App />
              <Analytics />
            </>
          }
        />
        <Route
          path="/p/:slug"
          element={
            <>
              <ProductPage />
              <Analytics />
            </>
          }
        />
        <Route
          path="/simulator"
          element={
            <>
              <PourSimulator />
              <Analytics />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
