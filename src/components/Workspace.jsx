import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

function Avatar({ person, size = "normal" }) {
  const src = person?.img?.startsWith("data:") || person?.img?.startsWith("http") ? person.img : person?.img ? `https://inceptaimg.s3.amazonaws.com/${person.img}` : "";
  return src ? <img className={`app-avatar app-avatar--${size}`} src={src} alt={person.name || "Mentor"} /> : <span className={`app-avatar app-avatar--${size} app-avatar--letter`}>{(person?.name || "?")[0]}</span>;
}

export default function Workspace() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [schools, setSchools] = useState([]);
  const [tab, setTab] = useState("explore");
  const [school, setSchool] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState({ name: "", grade: "", bio: "" });
  const [packs, setPacks] = useState([]);
  const [reportReason, setReportReason] = useState("");

  const refresh = useCallback(async () => {
    try {
      const [person, schoolList] = await Promise.all([api("/getuser"), api("/getschools")]);
      setUser(person);
      setSchools(schoolList);
      setProfile({ name: person.name || "", grade: person.grade || "", bio: person.bio || "" });
      setContacts(person.contacts || []);
      setError("");
    } catch (err) {
      if (err.status === 401 || err.status === 403) navigate("/login", { replace: true });
      else setError(err.message);
    } finally { setLoading(false); }
  }, [navigate]);
  useEffect(() => { refresh(); }, [refresh]);

  const showError = (err) => { setNotice(""); setError(err.message || "Please try again."); };
  const showNotice = (message) => { setError(""); setNotice(message); };
  const doTask = async (task) => {
    setBusy(true);
    setError("");
    try { await task(); }
    catch (err) { showError(err); }
    finally { setBusy(false); }
  };

  async function chooseSchool(name) {
    setSchool(name);
    setMentors([]);
    await doTask(async () => setMentors(await api("/getstudents", { method: "POST", body: { school: name } })));
  }
  async function requestMentor(mentor, kind) {
    await doTask(async () => {
      await api(kind === "call" ? "/requestcall" : "/match", { method: "POST", body: { receiver: mentor.uuid } });
      await refresh();
      showNotice(`Request sent to ${mentor.name}. You can message after they accept.`);
    });
  }
  const loadRequests = useCallback(async () => {
    try { setRequests(await api(user?.student ? "/myRequests" : "/getGigs")); }
    catch (err) { showError(err); }
  }, [user?.student]);
  async function respondToRequest(item, accepted) {
    await doTask(async () => {
      await api(accepted ? "/match" : "/reject", { method: "POST", body: accepted ? { receiver: item.uuid } : { person: item.uuid } });
      await Promise.all([loadRequests(), refresh()]);
      showNotice(accepted ? "Connection accepted." : "Request declined and credits returned to the student.");
    });
  }
  async function cancelRequest(item) {
    await doTask(async () => {
      await api("/cancelrequest", { method: "POST", body: { id: item.id } });
      await Promise.all([loadRequests(), refresh()]);
      showNotice("Request canceled and credits returned to your balance.");
    });
  }
  const loadInbox = useCallback(async () => {
    try {
      const feed = await api("/getFeed");
      setContacts((current) => current.map((person) => ({ ...person, messages: feed.find((entry) => entry.uuid === person.uuid)?.messageLength || 0 })));
    } catch (err) { showError(err); }
  }, []);
  async function chooseContact(person) {
    setContact(person);
    await doTask(async () => {
      setMessages(await api("/getMessages", { method: "POST", body: { person: person.uuid } }));
      await loadInbox();
    });
  }
  async function sendMessage(event) {
    event.preventDefault();
    if (!contact || !draft.trim()) return;
    await doTask(async () => {
      await api("/sendmessage", { method: "POST", body: { receiver: contact.uuid, message: draft.trim() } });
      setDraft("");
      setMessages(await api("/getMessages", { method: "POST", body: { person: contact.uuid } }));
    });
  }
  async function saveProfile(event) {
    event.preventDefault();
    await doTask(async () => {
      await api("/updateProfile", { method: "POST", body: profile });
      await refresh();
      showNotice("Profile updated.");
    });
  }
  async function reportContact(event) {
    event.preventDefault();
    if (!contact) return;
    await doTask(async () => {
      await api("/report", { method: "POST", body: { userId: contact.uuid, reason: reportReason.trim() } });
      setReportReason("");
      showNotice("Your report has been submitted.");
    });
  }
  async function buyCredits(pack) {
    await doTask(async () => {
      const result = await api("/create-checkout-session", { method: "POST", body: { pack } });
      if (!result.url?.startsWith("https://checkout.stripe.com/")) throw new Error("Checkout is unavailable right now.");
      window.location.assign(result.url);
    });
  }
  async function logout() {
    await doTask(async () => { await api("/logout", { method: "POST" }); navigate("/", { replace: true }); });
  }
  useEffect(() => {
    if (!user) return;
    if (tab === "requests") loadRequests();
    if (tab === "messages") loadInbox();
    if (tab === "credits" && user.student) api("/credit-packs").then((result) => setPacks(result.packs || [])).catch(showError);
  }, [tab, user, loadRequests, loadInbox]);

  if (loading) return <div className="app-loading">Opening Incepta…</div>;
  if (!user) return <div className="app-loading"><p>{error || "Unable to open your account."}</p><button className="button button-dark" onClick={refresh}>Try again</button><Link to="/">Back to home</Link></div>;
  const firstName = user.name?.split(" ")[0] || "there";
  const visibleSchools = schools.filter((entry) => entry.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="workspace">
    <aside className="app-sidebar"><Link className="brand app-brand" to="/"><span className="brand-mark">✳</span><span>incepta<span className="brand-period">.</span></span></Link><div className="app-account"><Avatar person={user} /><div><strong>{user.name}</strong><span>{user.student ? "Student explorer" : "College mentor"}</span></div></div><nav className="app-nav" aria-label="Account navigation">
      <button className={tab === "explore" ? "active" : ""} onClick={() => { setTab("explore"); setSchool(null); }}>↗ <span>{user.student ? "Explore colleges" : "Overview"}</span></button>
      <button className={tab === "requests" ? "active" : ""} onClick={() => setTab("requests")}>✳ <span>Requests</span></button>
      <button className={tab === "messages" ? "active" : ""} onClick={() => setTab("messages")}>✉ <span>Messages</span></button>
      {user.student && <button className={tab === "credits" ? "active" : ""} onClick={() => setTab("credits")}>◇ <span>Credits</span></button>}
      <button className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}>⚙ <span>Profile settings</span></button>
    </nav><div className="app-sidebar__bottom">{user.student && <div className="credit-balance"><span>YOUR BALANCE</span><strong>{user.tokens} credits</strong><button onClick={() => setTab("credits")}>Add credits →</button></div>}<button className="logout-button" onClick={logout}>Log out ↗</button></div></aside>
    <main className="app-main"><div className="app-topline"><span>THE INSIDE VIEW / {tab.toUpperCase()}</span><Link to="/">Visit website ↗</Link></div>{error && <div className="app-alert" role="alert">{error}</div>}{notice && <div className="app-notice" role="status">{notice}</div>}
      {tab === "explore" && user.student && <><div className="app-title-row"><div><span className="section-kicker">YOUR COLLEGE SEARCH</span><h1>{school ? school : `Hello, ${firstName}.`}</h1><p>{school ? "Hear from students who know this campus firsthand." : "Where would you like to look today?"}</p></div>{school && <button className="app-back" onClick={() => setSchool(null)}>← All colleges</button>}</div>{!school ? <><div className="app-search"><span>⌕</span><input aria-label="Search colleges" placeholder="Search colleges" value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="school-grid">{visibleSchools.map((entry) => <button className="school-card" key={entry.name} onClick={() => chooseSchool(entry.name)}><span className="school-card__icon">✳</span><span><strong>{entry.name}</strong><small>{entry.users} {entry.users === 1 ? "mentor" : "mentors"} available</small></span><b>↗</b></button>)}</div>{visibleSchools.length === 0 && <div className="app-empty"><span>◇</span><h3>{query ? "No colleges match that search." : "Mentors are on their way."}</h3><p>{query ? "Try another college name." : "Approved college mentors will appear here once they join."}</p></div>}</> : <div className="mentor-grid">{mentors.map((mentor) => <article className="mentor-card" key={mentor.uuid}><Avatar person={mentor} size="large" /><div><span className="mentor-card__school">{mentor.school || school}</span><h2>{mentor.name}</h2><p className="mentor-card__major">{mentor.major}</p><p className="mentor-card__bio">{mentor.bio}</p></div><div className="mentor-card__actions"><button disabled={busy || user.tokens < 85} onClick={() => requestMentor(mentor, "text")}>Request chat · 85 credits ↗</button><button disabled={busy || user.tokens < 350} onClick={() => requestMentor(mentor, "call")}>Request call · 350 credits ↗</button></div></article>)}{!mentors.length && <div className="app-empty"><span>◇</span><h3>No mentors are available here yet.</h3><p>Try another college while this community grows.</p></div>}</div>}</>}
      {tab === "explore" && !user.student && <><div className="app-title-row"><div><span className="section-kicker">MENTOR OVERVIEW</span><h1>Welcome back, {firstName}.</h1><p>Share the details that would have helped you choose your college.</p></div></div>{!user.approved && <div className="app-notice">Your profile is awaiting review. You’ll appear in college searches once approved.</div>}<div className="overview-grid"><button onClick={() => setTab("requests")}><span>01 / REQUESTS</span><strong>Review student requests</strong><b>↗</b></button><button onClick={() => setTab("messages")}><span>02 / CONVERSATIONS</span><strong>Continue your conversations</strong><b>↗</b></button><button onClick={() => setTab("settings")}><span>03 / PROFILE</span><strong>Keep your story current</strong><b>↗</b></button></div></>}
      {tab === "requests" && <><div className="app-title-row"><div><span className="section-kicker">{user.student ? "YOUR REQUESTS" : "MENTOR REQUESTS"}</span><h1>{user.student ? "Your connections." : "New connections."}</h1><p>{user.student ? "Track your requests. You can cancel a pending request for a full credit return." : "Choose the students you have time to help. Accepted call requests open a conversation so you can arrange a time."}</p></div><button className="app-back" onClick={loadRequests}>Refresh ↻</button></div><div className="request-list">{requests.map((item) => <article className="request-card" key={item.id}><Avatar person={item} /><div><h2>{item.name}</h2><p>{user.student ? item.school : `Grade ${item.grade}`} · {item.kind === "call" ? "Call request" : "Chat request"}{user.student ? ` · ${item.status}` : ""}</p></div>{user.student ? item.status === "pending" && <button disabled={busy} className="subtle-button" onClick={() => cancelRequest(item)}>Cancel request</button> : <><button disabled={busy} onClick={() => respondToRequest(item, true)}>Accept</button><button disabled={busy} className="subtle-button" onClick={() => respondToRequest(item, false)}>Decline</button></>}</article>)}{!requests.length && <div className="app-empty"><span>✳</span><h3>No requests yet.</h3><p>{user.student ? "Explore a college to meet its mentors." : "When a student reaches out, you’ll see the request here."}</p></div>}</div></>}
      {tab === "messages" && <><div className="app-title-row"><div><span className="section-kicker">CONVERSATIONS</span><h1>Keep talking.</h1><p>The small details make a big difference.</p></div><button className="app-back" onClick={loadInbox}>Refresh ↻</button></div><div className="inbox"><div className="inbox-contacts">{contacts.map((person) => <button key={person.uuid} className={contact?.uuid === person.uuid ? "selected" : ""} onClick={() => chooseContact(person)}><Avatar person={person} /><span><strong>{person.name}</strong><small>{person.school || "Incepta connection"}</small></span>{person.messages > 0 && <b>{person.messages}</b>}</button>)}{!contacts.length && <p className="inbox-hint">Accepted connections will appear here.</p>}</div><div className="inbox-thread">{contact ? <><div className="thread-header"><Avatar person={contact} /><div><strong>{contact.name}</strong><span>{contact.school}</span></div></div><div className="thread-messages">{messages.map((message, index) => <p key={`${message.timestamp}-${index}`} className={message.sender === "me" ? "from-me" : "from-them"}>{message.message}</p>)}{!messages.length && <div className="thread-empty">Start the conversation with a question.</div>}</div><form className="thread-compose" onSubmit={sendMessage}><input aria-label="Write a message" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={1000} placeholder="Write a message…" /><button disabled={busy || !draft.trim()}>Send ↗</button></form><details className="thread-report"><summary>Report a concern</summary><form onSubmit={reportContact}><textarea required minLength={10} maxLength={1000} value={reportReason} onChange={(e) => setReportReason(e.target.value)} placeholder="Tell us what happened." /><button disabled={busy}>Submit report</button></form></details></> : <div className="thread-empty">Select a conversation to read and reply.</div>}</div></div></>}
      {tab === "settings" && <><div className="app-title-row"><div><span className="section-kicker">YOUR PROFILE</span><h1>Make it yours.</h1><p>Help your connections understand who you are.</p></div></div><form className="settings-form" onSubmit={saveProfile}><label>Name<input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} maxLength={60} required /></label><label>{user.student ? "Grade" : "College year"}<select value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })}>{(user.student ? [["9","Grade 9"],["10","Grade 10"],["11","Grade 11"],["12","Grade 12"]] : [["13","First year"],["14","Second year"],["15","Third year"],["16","Fourth year"]]).map(([value,label]) => <option value={value} key={value}>{label}</option>)}</select></label>{!user.student && <label>About you<textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} maxLength={600} rows={6} required /></label>}<button className="button button-dark" disabled={busy}>Save changes ↗</button></form></>}
      {tab === "credits" && <><div className="app-title-row"><div><span className="section-kicker">YOUR CREDITS</span><h1>More conversations.</h1><p>You have {user.tokens} credits. A chat request costs 85 credits; a call request costs 350.</p></div></div><div className="pack-grid">{packs.map((pack) => <button key={pack} disabled={busy} onClick={() => buyCredits(pack)}><span>CREDIT PACK</span><strong>{pack}</strong><small>credits</small><b>Continue to secure checkout ↗</b></button>)}{!packs.length && <div className="app-empty"><span>◇</span><h3>Credit purchases are not available yet.</h3><p>We’ll show purchase options here once checkout is configured.</p></div>}</div></>}
    </main>
  </div>;
}
