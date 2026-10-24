import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><nav className="page-container site-nav" aria-label="Main navigation">
    <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">✳</span><span>incepta<span className="brand-period">.</span></span></Link>
    <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="nav-links" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
    <div className={`nav-links${open ? " nav-links--open" : ""}`} id="nav-links"><a href="/#why-incepta" onClick={() => setOpen(false)}>Why Incepta</a><a href="/#how-it-works" onClick={() => setOpen(false)}>How it works</a><Link to="/login" onClick={() => setOpen(false)}>Log in</Link><Link className="nav-join" to="/signup" onClick={() => setOpen(false)}>Get started <span aria-hidden="true">↗</span></Link></div>
  </nav></header>;
}
