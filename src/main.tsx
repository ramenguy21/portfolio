import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BlogPage from "./pages/Blog";
import CaseStudyPage from "./pages/CaseStudyPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/case-studies" element={<CaseStudyPage />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
