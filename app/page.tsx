"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const nav = ["Features", "Benefits", "NGOs", "About"];
const features = [
  ["01", "Location-based discovery", "Find the nearest recovery partners while the window for action is still open.", "NEARBY / 08"],
  ["02", "Donation & waste requests", "Create a clear hand-off for edible surplus or organic waste in a few deliberate steps.", "CREATE / READY"],
  ["03", "Verified recovery network", "Understand who is receiving a request before the recovery begins.", "NETWORK / 24"],
  ["04", "Pickup orchestration", "Move from request to confirmed collection with less back-and-forth.", "PICKUP / 18:30"],
  ["05", "Urgency tracking", "Keep every time-sensitive request visible before its window closes.", "WINDOW / 01:42"],
  ["06", "Route intelligence", "Help recovery teams take the more direct next step across the city.", "ROUTE / 3.4 KM"],
  ["07", "Real-time notifications", "Keep the network informed when responsibility changes hands.", "UPDATE / SENT"],
  ["08", "Impact dashboard", "Turn completed recoveries into a visible, useful record of impact.", "IMPACT / +124"],
];
const organizations = [
  ["Helping Hands Foundation", "Koramangala", "Prepared meals · Bakery", "24 meals today", "HH"],
  ["Feed Forward Foundation", "Indiranagar", "Vegetarian · Produce", "Available", "FF"],
  ["Seva Food Network", "HSR Layout", "Prepared meals · Staples", "Collection at 19:00", "SF"],
  ["Green Hope Initiative", "Jayanagar", "Organic waste", "Composting", "GH"],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Mark() { return <svg className={styles.mark} viewBox="0 0 32 32" aria-label="Annapurna mark"><path d="M16 3c1 8-7 9-7 17a7 7 0 0 0 14 0c0-8-8-9-7-17Z" fill="currentColor"/><path d="M16 10v15M11 17l5 3 5-3" fill="none" stroke="#f4f1e8" strokeWidth="1.5"/></svg> }

function RecoveryDiagram() {
  return <div className={styles.diagram} aria-label="Annapurna recovery network diagram">
    <div className={`${styles.diagramNode} ${styles.surplus}`}>SURPLUS</div>
    <div className={`${styles.diagramNode} ${styles.edible}`}>EDIBLE<br/>FOOD</div>
    <div className={`${styles.diagramNode} ${styles.organic}`}>ORGANIC<br/>WASTE</div>
    <svg className={styles.routes} viewBox="0 0 900 570" preserveAspectRatio="none" aria-hidden="true"><path d="M450 70V130M450 130H230V200M450 130H670V200M230 280V345H330M670 280V345H570M330 415V485H450M570 415V485H450"/><circle cx="450" cy="112" r="5"/><circle cx="310" cy="345" r="5"/><circle cx="590" cy="345" r="5"/></svg>
    <div className={`${styles.diagramNode} ${styles.core}`}><Mark/> ANNAPURNA</div>
    <div className={`${styles.diagramNode} ${styles.ngo}`}>VERIFIED<br/>NGO</div>
    <div className={`${styles.diagramNode} ${styles.partner}`}>WASTE<br/>PARTNER</div>
    <div className={`${styles.diagramNode} ${styles.impactNode}`}>MEASURABLE<br/><em>IMPACT</em></div>
  </div>
}

function MiniMap() { return <div className={styles.map} role="img" aria-label="Demo map showing nearby recovery network partners"><div className={styles.mapLines}/><i className={styles.pinOne}>✦</i><i className={styles.pinTwo}>●</i><i className={styles.pinThree}>✦</i><div className={styles.mapCard}><small>NEARBY NETWORK</small><strong>12 partners within 5 km</strong><span>Demo location data</span></div></div> }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All recovery types");
  const [availability, setAvailability] = useState("Any availability");
  const visibleOrganizations = organizations.filter(([, orgLocation, kind, status]) =>
    (location === "All locations" || orgLocation === location) &&
    (type === "All recovery types" || (type === "Organic waste" ? kind.includes("Organic") : !kind.includes("Organic"))) &&
    (availability === "Any availability" || (availability === "Available now" ? status === "Available" : status !== "Available"))
  );
  useEffect(() => { const listener = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", listener); return () => window.removeEventListener("scroll", listener); }, []);
  return <main>
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <a className={styles.brand} href="#top" aria-label="Annapurna home"><Mark/><span>ANNAPURNA</span></a>
      <nav className={menu ? styles.open : ""} aria-label="Main navigation">{nav.map((item) => <a key={item} onClick={() => setMenu(false)} href={`#${item.toLowerCase()}`}>{item}<Arrow/></a>)}<a onClick={() => setMenu(false)} href="#download" className={styles.navCta}>Get the app <Arrow/></a></nav>
      <button className={styles.menu} onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><span/><span/></button>
    </header>
    <section className={styles.hero} id="top">
      <div className={styles.eyebrow}>01 / A RECOVERY NETWORK <span>● BENGALURU, INDIA</span></div>
      <h1><span>No Food</span><i>Wasted.</i><br/><span>Every Meal</span> <i>Matters.</i></h1>
      <div className={styles.heroBottom}><p>A technology network that moves food surplus toward people—and organic waste toward purpose.</p><div className={styles.heroActions}><a href="#download" className={styles.button}>Download Annapurna <Arrow/></a><a href="#network" className={styles.textLink}>Explore the network <Arrow/></a></div></div>
      <div className={styles.orbit} aria-hidden="true"><span>RECOVER / CONNECT / MEASURE /</span></div><div className={styles.heroIndex}>SCROLL TO BEGIN <b>↓</b></div>
    </section>
    <section className={styles.problem} id="benefits"><div className={styles.sectionLabel}>02 / THE PROBLEM</div><h2>Good food becomes waste.<br/><i>Useful resources</i> disappear.</h2><div className={styles.problemGrid}>{[["01", "Surplus exists", "Restaurants, caterers and businesses regularly have usable food after service."],["02", "Time matters", "Recovery is time-sensitive. Finding the right organization quickly is hard."],["03", "Not all is edible", "Unsuitable food needs its own responsible organic-waste pathway."]].map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><p className={styles.closeStatement}>Annapurna connects the missing pieces <Arrow/></p></section>
    <section className={styles.network} id="network"><div className={styles.sectionLabel}>03 / THE SYSTEM</div><div className={styles.splitHeading}><h2>When surplus has<br/>nowhere to go, <i>give it a route.</i></h2><p>One live network makes the next responsible action easier to find, act on, and measure.</p></div><RecoveryDiagram/><div className={styles.legend}><span><b className={styles.orangeDot}/>Edible food recovery</span><span><b className={styles.greenDot}/>Organic waste recovery</span><span>● Animated demo system</span></div></section>
    <section className={styles.pathways}><div><span>PATHWAY / 01</span><h3>Edible food<br/><i>recovery</i></h3><ol><li>DONOR</li><li>SURPLUS FOOD</li><li>VERIFIED NGO</li><li>PICKUP & DISTRIBUTION</li></ol></div><div><span>PATHWAY / 02</span><h3>Organic waste<br/><i>recovery</i></h3><ol><li>DONOR</li><li>ORGANIC WASTE</li><li>WASTE PARTNER</li><li>COLLECTION & PROCESSING</li></ol></div></section>
    <section className={styles.features} id="features"><div className={styles.sectionLabel}>04 / SYSTEM CAPABILITIES</div><div className={styles.featureIntro}><h2>Engineered for<br/><i>recovery.</i></h2><p>A system designed for the decisions between surplus and impact.</p></div><div className={styles.capabilityViewport}><div className={styles.capabilityStrip} style={{transform:`translate3d(calc(${activeFeature} * -33.333%),0,0)`}}>{features.map(([n,t,d,meta], index) => <article key={n} className={`${styles.capabilityCard} ${activeFeature === index ? styles.capabilityActive : ""}`} onMouseEnter={() => setActiveFeature(index)}><div className={styles.cardMeta}><span>{n}</span><span>{meta}</span></div><div><h3>{t}</h3><p>{d}</p></div><strong>{n}</strong><button onClick={() => setActiveFeature(index)} aria-label={`Show ${t}`}>Explore <Arrow/></button></article>)}</div></div><div className={styles.capabilityNav}>{features.map(([n,t], index) => <button key={n} onClick={() => setActiveFeature(index)} className={activeFeature === index ? styles.capabilityNavActive : ""} aria-label={`Show ${t}`}>{n} <span>{t}</span></button>)}</div></section>
    <section className={styles.impact}><div className={styles.impactCopy}><div className={styles.sectionLabel}>05 / THE IMPACT</div><h2>Impact is more<br/>than a <i>number.</i></h2><p>Every completed recovery builds a clearer picture of what a connected local network can do.</p><small>Illustrative development data — ready to connect to live platform data.</small></div><div className={styles.dashboard}><div className={styles.dashboardTop}><span>NETWORK IMPACT / YTD</span><span>LIVE DEMO ●</span></div><div className={styles.metrics}><strong>1,240<small>MEALS REDIRECTED</small></strong><strong>438<small>KG DIVERTED</small></strong></div><div className={styles.chart}><span>RECOVERY / MONTH</span><svg viewBox="0 0 420 130" preserveAspectRatio="none" aria-label="Demo recovery chart"><path className={styles.area} d="M0 112 L65 94 L130 101 L195 70 L260 78 L325 36 L420 13 V130 H0Z"/><path d="M0 112 L65 94 L130 101 L195 70 L260 78 L325 36 L420 13"/></svg><div>JAN <b>FEB</b> MAR <b>APR</b> MAY <b>JUN</b> JUL</div></div><div className={styles.donut}><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="39"/><circle className={styles.donutFood} cx="50" cy="50" r="39"/></svg><span><b>72%</b> edible food<br/>recovery</span></div></div></section>
    <section className={styles.directory} id="ngos"><div className={styles.sectionLabel}>06 / THE NETWORK</div><div className={styles.splitHeading}><h2>Organizations at<br/>the <i>other end of recovery.</i></h2><p>Explore a demo directory of the organizations and partners that make local recovery possible.</p></div><div className={styles.directoryTools}><span>DEMO NETWORK DATA — NOT LIVE VERIFICATION</span><label><span>Location</span><select value={location} onChange={(e) => setLocation(e.target.value)}><option>All locations</option><option>Koramangala</option><option>Indiranagar</option></select></label><label><span>Recovery type</span><select value={type} onChange={(e) => setType(e.target.value)}><option>All recovery types</option><option>Food recovery</option><option>Organic waste</option></select></label><label><span>Availability</span><select value={availability} onChange={(e) => setAvailability(e.target.value)}><option>Any availability</option><option>Available now</option><option>Scheduled</option></select></label></div><div className={styles.directoryContent}><div className={styles.orgList}>{visibleOrganizations.length ? visibleOrganizations.map(([name, orgLocation, kind, status, initials]) => <article key={name}><b>{initials}</b><div><h3>{name} <em>DEMO ✓</em></h3><p>{orgLocation}<i/> {kind}</p></div><span>{status}<Arrow/></span></article>) : <p className={styles.empty}>No demo organizations match these filters.</p>}</div><MiniMap/></div></section>
    <section className={styles.phoneShowcase}><div className={styles.sectionLabel}>07 / IN YOUR POCKET</div><h2>The recovery network,<br/><i>in your pocket.</i></h2><div className={styles.phones}><div className={`${styles.phone} ${styles.phoneMap}`}><small>9:41</small><h4>Nearby recovery</h4><div className={styles.phoneMapArt}><i>●</i><i>✦</i><i>●</i></div><p>8 partners available now</p></div><div className={`${styles.phone} ${styles.phoneDonation}`}><small>9:41</small><h4>Create donation</h4><div className={styles.foodSketch}>✦</div><strong>Fresh meal trays</strong><p>Pickup before 20:30</p><button>Continue →</button></div><div className={`${styles.phone} ${styles.phoneImpact}`}><small>9:41</small><h4>Your impact</h4><strong>124<span> meals</span></strong><div className={styles.miniBars}><i/><i/><i/><i/><i/></div><p>Redirected this month</p></div></div></section>
    <section className={styles.about} id="about"><div className={styles.aboutMark}><Mark/></div><div><div className={styles.sectionLabel}>08 / ABOUT ANNAPURNA</div><h2>Food that still has value <i>shouldn’t automatically become waste.</i></h2><p>Annapurna is built around a simple idea: better connections make responsible recovery more possible. We bring donors, NGOs, volunteers, and processing partners closer to the moments that matter.</p><a className={styles.textLink} href="#download">Read our approach <Arrow/></a></div></section>
    <section className={styles.download} id="download"><span>09 / JOIN THE NETWORK</span><h2>Make every<br/><i>meal matter.</i></h2><p>Download Annapurna and become part of a recovery network connecting surplus with purpose.</p><div><a className={styles.store} href={process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#download"}>Google Play <Arrow/></a><a className={`${styles.store} ${styles.muted}`} href={process.env.NEXT_PUBLIC_APP_STORE_URL || "#download"}>App Store <small>COMING SOON</small></a><div className={styles.qr}>▦<small>SCAN TO<br/>DOWNLOAD</small></div></div></section>
    <footer><a className={styles.brand} href="#top"><Mark/><span>ANNAPURNA</span></a><p>No Food Wasted. Every Meal Matters.</p><div><a href="#features">Features</a><a href="#benefits">Benefits</a><a href="#ngos">NGOs</a><a href="#about">About</a></div><small>© 2026 Annapurna. Built for recovery.</small></footer>
  </main>;
}
