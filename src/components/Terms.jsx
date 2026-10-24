import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Terms() {
  return <div className="site-shell"><Navbar /><main className="legal-page page-container">
    <span className="section-kicker">USING THE PLATFORM</span><h1>Incepta terms</h1><p className="legal-date">Updated October 24, 2026</p>
    <p>Incepta helps high school students learn about colleges from people who attend them. These terms explain the current platform rules.</p>
    <section><h2>Who can use Incepta</h2><p>You must be at least 13 years old. Give accurate account information and keep your login details private. Mentors must be current college students; mentor profiles appear in search after email verification and review.</p></section>
    <section><h2>Respectful conversations</h2><p>Use Incepta for honest questions and answers about colleges. Do not harass, impersonate, threaten, or solicit other users. Avoid sharing private contact details, financial information, or other sensitive information in messages. Report concerning conduct from a conversation.</p></section>
    <section><h2>Requests and credits</h2><p>A chat request costs 85 credits and a call request costs 350 credits when sent. If a mentor declines or you cancel a pending request, the credits are returned. An accepted call request opens a conversation where the participants can arrange a time and method for the call; Incepta does not currently provide a built-in video room. Prices for credit packs are shown by the checkout provider before payment.</p></section>
    <section><h2>Content and availability</h2><p>Users are responsible for the content they submit. Mentor opinions are personal experiences, not admissions or financial advice. We may remove accounts or content that violates these rules. Features may change or be unavailable at times.</p></section>
    <section><h2>Questions</h2><p>For questions about these terms or the service, contact <a href="mailto:aaritpaliwal@useincepta.com">aaritpaliwal@useincepta.com</a>. See the <a href="/privacy">privacy page</a> for information about account data.</p></section>
  </main><Footer /></div>;
}
