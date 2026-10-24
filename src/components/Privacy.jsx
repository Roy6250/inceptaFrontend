import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Privacy() {
  return <div className="site-shell"><Navbar /><main className="legal-page page-container">
    <span className="section-kicker">ABOUT YOUR INFORMATION</span><h1>Privacy at Incepta</h1><p className="legal-date">Updated October 24, 2026</p>
    <p>Incepta connects high school students with current college students. This page describes the information used by the platform and how to contact us about it.</p>
    <section><h2>Information you provide</h2><p>Account registration collects your name, email address, password, grade or college year, and interests. College mentors also provide a school and short biography, and may add a profile photo. We store messages, connection requests, reports, and credit transactions needed to run the service.</p></section>
    <section><h2>How it is used</h2><p>We use account details to sign you in, verify your email, show approved mentor profiles, connect students and mentors, deliver messages, and respond to reports. Approved mentor names, schools, interests, biographies, and photos are visible to signed-in students. Accepted connections can see each other’s names and conversation history. We do not show account passwords to other users.</p></section>
    <section><h2>Service providers</h2><p>When configured, an email provider sends verification and password reset messages. Credit purchases use a checkout provider; payment card details are entered with that provider, while Incepta stores the purchase reference and credits added to your account. Hosting providers may process the information needed to run the site.</p></section>
    <section><h2>Security and choices</h2><p>Passwords are stored as password hashes, and account sessions use HTTP-only cookies. No online system can guarantee absolute security. You can update your name, grade, and mentor biography in your account. To request access, correction, or deletion of your information, email <a href="mailto:aaritpaliwal@useincepta.com">aaritpaliwal@useincepta.com</a>.</p></section>
    <section><h2>Age</h2><p>Incepta is for people aged 13 or older. If you believe someone under 13 has created an account, contact us so we can review it.</p></section>
  </main><Footer /></div>;
}
