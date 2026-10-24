import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { api } from "../api";

export default function ResetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [devCode, setDevCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      if (step === "email") {
        const result = await api("/forgotpassword", { method: "POST", body: { email } });
        setDevCode(result.devCode || "");
        setStep("code");
      } else {
        await api("/verifyPassword", { method: "POST", body: { email, code, password } });
        navigate("/login", { replace: true });
      }
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="site-shell auth-page"><Navbar /><main className="auth-main page-container"><div className="auth-intro"><span className="section-kicker">ACCOUNT HELP</span><h1>Find your way back.</h1><p>{step === "email" ? "Enter your email and we’ll send you a reset code." : "If that email has an account, enter the code we sent and choose a new password."}</p><div className="auth-illustration" aria-hidden="true"><span>START<br />AGAIN.</span><b>✳</b></div></div><form className="auth-panel" onSubmit={submit}>{error && <div className="form-alert" role="alert">{error}</div>}<p className="auth-panel__eyebrow">RESET PASSWORD</p>{step === "email" ? <><label className="field-label" htmlFor="reset-email">Email address</label><input id="reset-email" className="auth-input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></> : <><label className="field-label" htmlFor="reset-code">Reset code</label><input id="reset-code" className="auth-input" required value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" autoComplete="one-time-code" />{devCode && <p className="dev-code">Local test code: <strong>{devCode}</strong></p>}<label className="field-label" htmlFor="reset-password">New password</label><input id="reset-password" className="auth-input" type="password" minLength={8} autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></>}<button className="button button-dark auth-submit" disabled={busy}>{busy ? "Please wait…" : step === "email" ? "Send reset code" : "Update password"} →</button><p className="auth-switch"><Link to="/login">Back to log in</Link></p></form></main><Footer /></div>;
}
