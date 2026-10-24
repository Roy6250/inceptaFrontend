import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer"><div className="page-container">
    <div className="footer-top"><div><Link className="brand brand--footer" to="/"><span className="brand-mark" aria-hidden="true">✳</span><span>incepta<span className="brand-period">.</span></span></Link><p>Conversations that make the college search feel clearer.</p></div>
      <div className="footer-links"><div><span>Explore</span><a href="/#why-incepta">Why Incepta</a><a href="/#how-it-works">How it works</a><Link to="/signup">Get started</Link></div><div><span>Account</span><Link to="/login">Log in</Link><Link to="/signup">Sign up</Link></div><div><span>Follow</span><a href="https://www.instagram.com/getincepta/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.tiktok.com/@getincepta" target="_blank" rel="noreferrer">TikTok ↗</a></div></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Incepta</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div><span>Made for the next chapter.</span></div>
  </div></footer>;
}
