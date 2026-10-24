import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { api } from "../api";

const interests = ["Business", "Computer Science", "Engineering", "Biology", "Economics", "Psychology", "Political Science", "History", "Math", "Art", "Music", "Nursing", "Education", "Environmental Science", "Other"];

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(mode === "signup" ? "role" : "form");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", grade: "11", interests: [], bio: "", school: "", img: "", ageConfirmed: false });
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (mode === "signup") {
      if (form.name.trim().length < 2) return setError("Please enter your name.");
      if (form.password.length < 8) return setError("Use a password with at least 8 characters.");
      if (!form.interests.length) return setError("Choose at least one interest or major.");
      if (role === "mentor" && !form.school.trim()) return setError("Enter the college you attend.");
      if (role === "mentor" && form.bio.trim().length < 20) return setError("Tell students a little more about yourself.");
    }
    setBusy(true);
    try {
      if (mode === "login") {
        const result = await api("/login", { method: "POST", body: { email: form.email.trim(), password: form.password } });
        if (result.requiresVerification) setStep("verify");
        else navigate("/main", { replace: true });
      } else {
        const result = await api("/signup", { method: "POST", body: { student: role === "student", name: form.name.trim(), email: form.email.trim(), password: form.password, grade: form.grade, interests: form.interests, bio: form.bio.trim(), school: form.school.trim(), img: form.img, ageConfirmed: form.ageConfirmed } });
        setDevCode(result.devCode || "");
        setStep("verify");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api("/verify", { method: "POST", body: { code: code.trim() } });
      navigate("/main", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function selectInterest(value) {
    set("interests", form.interests.includes(value) ? form.interests.filter((x) => x !== value) : [...form.interests, value].slice(0, 6));
  }

  function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 2_000_000) return setError("Choose an image smaller than 2 MB.");
    const reader = new FileReader();
    reader.onload = () => set("img", reader.result);
    reader.readAsDataURL(file);
  }

  const title = mode === "login" ? "Welcome back." : step === "role" ? "Let’s start with you." : step === "verify" ? "Check your inbox." : "Make your next move.";
  return <div className="site-shell auth-page"><Navbar /><main className="auth-main page-container"><div className="auth-intro"><span className="section-kicker">THE INSIDE VIEW STARTS HERE</span><h1>{title}</h1><p>{mode === "login" ? "Log in to continue your college conversations." : step === "role" ? "Tell us which side of the conversation you’re on." : step === "verify" ? "Enter the verification code sent to your email to finish setting up your account." : "Create your profile and start finding the people and perspectives that fit your search."}</p><div className="auth-illustration" aria-hidden="true"><span>ASK<br />MORE.</span><b>✳</b></div></div><div className="auth-panel">
    {error && <div className="form-alert" role="alert">{error}</div>}
    {step === "role" && <div><p className="auth-panel__eyebrow">I AM A...</p><button className="role-choice" type="button" onClick={() => { setRole("student"); set("grade", "11"); setStep("form"); }}><span className="role-choice__icon">↗</span><span><strong>High school student</strong><small>I’m exploring colleges and programs.</small></span><span aria-hidden="true">→</span></button><button className="role-choice" type="button" onClick={() => { setRole("mentor"); set("grade", "13"); setStep("form"); }}><span className="role-choice__icon">✳</span><span><strong>College student</strong><small>I want to share my perspective.</small></span><span aria-hidden="true">→</span></button><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p></div>}
    {step === "verify" && <form onSubmit={verify}><p className="auth-panel__eyebrow">VERIFY YOUR EMAIL</p><label className="field-label" htmlFor="verification-code">Verification code</label><input id="verification-code" className="auth-input" value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" autoComplete="one-time-code" required />{devCode && <p className="dev-code">Local test code: <strong>{devCode}</strong></p>}<button className="button button-dark auth-submit" disabled={busy}>{busy ? "Verifying…" : "Verify and continue"} <span aria-hidden="true">→</span></button></form>}
    {step === "form" && <form onSubmit={submit}><p className="auth-panel__eyebrow">{mode === "login" ? "LOG IN" : `CREATE YOUR ${role === "mentor" ? "MENTOR" : "STUDENT"} ACCOUNT`}</p>{mode === "signup" && <><label className="field-label" htmlFor="auth-name">Your name</label><input id="auth-name" className="auth-input" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} required maxLength={60} /></>}
      <label className="field-label" htmlFor="auth-email">Email address</label><input id="auth-email" className="auth-input" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder={role === "mentor" ? "you@college.edu" : "you@example.com"} />
      <label className="field-label" htmlFor="auth-password">Password</label><input id="auth-password" className="auth-input" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={form.password} onChange={(e) => set("password", e.target.value)} required minLength={mode === "signup" ? 8 : undefined} />
      {mode === "signup" && <><label className="field-label" htmlFor="auth-grade">{role === "mentor" ? "College year" : "Grade"}</label><select id="auth-grade" className="auth-input" value={form.grade} onChange={(e) => set("grade", e.target.value)}>{(role === "mentor" ? [["13","First year"],["14","Second year"],["15","Third year"],["16","Fourth year"]] : [["9","Grade 9"],["10","Grade 10"],["11","Grade 11"],["12","Grade 12"]]).map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select>{role === "mentor" && <><label className="field-label" htmlFor="auth-school">College or university</label><input id="auth-school" className="auth-input" value={form.school} onChange={(e) => set("school", e.target.value)} maxLength={100} required placeholder="Your college" /></>}<fieldset className="interest-field"><legend className="field-label">{role === "mentor" ? "Your majors" : "Your interests"} <small>Choose up to 6</small></legend><div className="interest-options">{interests.map((interest) => <button type="button" key={interest} className={form.interests.includes(interest) ? "interest-chip interest-chip--active" : "interest-chip"} onClick={() => selectInterest(interest)} aria-pressed={form.interests.includes(interest)}>{interest}</button>)}</div></fieldset>{role === "mentor" && <><label className="field-label" htmlFor="auth-bio">Tell students about yourself</label><textarea id="auth-bio" className="auth-input auth-textarea" value={form.bio} onChange={(e) => set("bio", e.target.value)} maxLength={600} placeholder="What do you study? What do you wish you knew before college?" required /><label className="field-label" htmlFor="auth-photo">Profile photo <small>Optional</small></label><input id="auth-photo" className="auth-file" type="file" accept="image/*" onChange={chooseImage} /></>}</>}
      {mode === "signup" && <label className="age-check"><input type="checkbox" checked={form.ageConfirmed} onChange={(e) => set("ageConfirmed", e.target.checked)} required />I am at least 13 years old.</label>}
      <button className="button button-dark auth-submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"} <span aria-hidden="true">→</span></button><p className="auth-switch">{mode === "login" ? <>New to Incepta? <Link to="/signup">Create an account</Link></> : <>Already have an account? <Link to="/login">Log in</Link></>}</p>{mode === "login" && <p className="auth-switch"><Link to="/forgotPassword">Forgot your password?</Link></p>}{mode === "signup" && <button className="auth-back" type="button" onClick={() => setStep("role")}>← Change account type</button>}</form>}
  </div></main><Footer /></div>;
}
