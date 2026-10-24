import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Index from "./Index";
import AuthPage from "./AuthPage";
import Workspace from "./Workspace";
import Terms from "./Terms";
import Privacy from "./Privacy";
import ResetPage from "./ResetPage";

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/signup" element={<AuthPage mode="signup" />} />
    <Route path="/main" element={<Workspace />} />
    <Route path="/forgotPassword" element={<ResetPage />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="*" element={<div className="app-loading"><h1>Page not found.</h1><Link to="/">Back to Incepta</Link></div>} />
  </Routes></BrowserRouter>;
}
