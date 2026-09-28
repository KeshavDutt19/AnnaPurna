"use client";

import { useEffect, useState } from "react";
import { architectureNodes, architectureRoutes } from "./architecture";
import styles from "./page.module.css";

const nav = [["Infrastructure", "infrastructure"], ["Benefits", "benefits"], ["NGOs", "ngos"], ["About", "about"]] as const;
const capabilities = [
  ["01", "Discover", "Locate verified recovery partners nearby while the window for action is still open.", "NEARBY / 08"],
  ["02", "Coordinate", "Create a clear, time-aware hand-off for edible surplus or organic waste.", "CREATE / READY"],
  ["03", "Verify", "Give every donor a trustworthy view of who receives each recovery request.", "NETWORK / 24"],
  ["04", "Orchestrate", "Move from request to confirmed collection with less back-and-forth.", "PICKUP / 18:30"],
  ["05", "Measure", "Turn every completed recovery into a useful, visible record of impact.", "IMPACT / +124"],
];
const organizations = [
  ["Helping Hands Foundation", "Koramangala", "Prepared meals · Bakery", "24 meals today", "HH"],
  ["Feed Forward Foundation", "Indiranagar", "Vegetarian · Produce", "Available", "FF"],
  ["Seva Food Network", "HSR Layout", "Prepared meals · Staples", "Collection at 19:00", "SF"],
  ["Green Hope Initiative", "Jayanagar", "Organic waste", "Composting", "GH"],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Mark() { return <svg className={styles.mark} viewBox="0 0 32 32" aria-label="Annapurna mark"><path d="M16 3c1 8-7 9-7 17a7 7 0 0 0 14 0c0-8-8-9-7-17Z" fill="currentColor"/><path d="M16 10v15M11 17l5 3 5-3" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>; }

function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  return <div className={`${styles.diagram} ${compact ? styles.diagramCompact : ""}`} role="img" aria-label="Annapurna recovery system architecture">
    <svg className={styles.routes} viewBox="0 0 900 570" preserveAspectRatio="none" aria-hidden="true"><path d={architectureRoutes.path}/>{architectureRoutes.junctions.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5"/>)}</svg>
    {architectureNodes.map((node) => <div key={node.id} className={`${styles.diagramNode} ${styles[node.className]}`}>{node.id === "core" && <Mark/>}{node.label.map((line, index) => node.id === "impact" && index === 1 ? <em key={line}>{line}</em> : <span key={line}>{line}</span>)}</div>)}
  </div>;
}

function MiniMap() { return <div className={styles.map} role="img" aria-label="Demo map showing nearby recovery partners"><div className={styles.mapLines}/><i className={styles.pinOne}>✦</i><i className={styles.pinTwo}>●</i><i className={styles.pinThree}>✦</i><div className={styles.mapCard}><small>NEARBY NETWORK</small><strong>12 partners within 5 km</strong><span>Demo location data</span></div></div>; }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All recovery types");
  const visibleOrganizations = organizations.filter(([, orgLocation, kind]) => (location === "All locations" || orgLocation === location) && (type === "All recovery types" || (type === "Organic waste" ? kind.includes("Organic") : !kind.includes("Organic"))));
  useEffect(() => { const listener = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", listener); return () => window.removeEventListener("scroll", listener); }, []);

  return <main>
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}><a className={styles.brand} href="#top" aria-label="Annapurna home"><Mark/><span>ANNAPURNA</span></a><nav className={menu ? styles.open : ""} aria-label="Main navigation">{nav.map(([label, target]) => <a key={target} onClick={() => setMenu(false)} href={`#${target}`}>{label}<Arrow/></a>)}<a onClick={() => setMenu(false)} href="#download" className={styles.navCta}>Get the app <Arrow/></a></nav><button className={styles.menu} onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}><span/><span/></button></header>

    <section className={styles.hero} id="top"><div className={styles.container}><div className={styles.eyebrow}>01 / A RECOVERY NETWORK <span>● DELHI , INDIA</span></div><h1><span>No Food</span><i>Wasted.</i><br/><span>Every Meal</span> <i>Matters.</i></h1><div className={styles.heroBottom}><p>A technology network that moves food surplus toward people—and organic waste toward purpose.</p><div className={styles.heroActions}><a href="/app-release.apk" download className={styles.button}>Download Annapurna <Arrow/></a><a href="#system" className={styles.textLink}>Explore the network <Arrow/></a></div></div><div className={styles.orbit} aria-hidden="true"><span>RECOVER / CONNECT / MEASURE /</span></div><div className={styles.heroIndex}>SCROLL TO BEGIN <b>↓</b></div></div></section>

    <section className={styles.problem} id="benefits"><div className={styles.container}><div className={styles.sectionLabel}>02 / THE PROBLEM</div><h2>Good food becomes waste.<br/><i>Useful resources</i> disappear.</h2><div className={styles.problemGrid}>{[["01", "Surplus exists", "Restaurants, caterers and businesses regularly have usable food after service."], ["02", "Time matters", "Recovery is time-sensitive. Finding the right organization quickly is hard."], ["03", "Not all is edible", "Unsuitable food needs its own responsible organic-waste pathway."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className={styles.network} id="system"><div className={styles.container}><div className={styles.sectionLabel}>03 / SYSTEM ARCHITECTURE</div><div className={styles.splitHeading}><h2>When surplus has<br/>nowhere to go, <i>give it a route.</i></h2><p>One live network makes the next responsible action easier to find, act on, and measure.</p></div><ArchitectureDiagram/><div className={styles.legend}><span><b className={styles.orangeDot}/>Edible food recovery</span><span><b className={styles.greenDot}/>Organic waste recovery</span><span>● Live network flow</span></div></div></section>

    <section className={styles.pathways}><div className={styles.container}><article><span>PATHWAY / 01</span><h3>Edible food<br/><i>recovery</i></h3><ol><li>DONOR</li><li>SURPLUS FOOD</li><li>VERIFIED NGO</li><li>PICKUP & DISTRIBUTION</li></ol></article><article><span>PATHWAY / 02</span><h3>Organic waste<br/><i>recovery</i></h3><ol><li>DONOR</li><li>ORGANIC WASTE</li><li>WASTE PARTNER</li><li>COLLECTION & PROCESSING</li></ol></article></div></section>

    <section className={styles.features} id="infrastructure"><div className={styles.container}><div className={styles.sectionLabel}>04 / INFRASTRUCTURE</div><div className={styles.featureIntro}><h2>Built to<br/><i>connect.</i></h2><p>The operational layers that make each recovery reliable—from the first signal to measurable impact.</p></div><div className={styles.infrastructureGrid}><div className={styles.infrastructureDiagram}><p>SHARED SYSTEM REFERENCE</p><ArchitectureDiagram compact/></div><div className={styles.capabilitySystem}>{capabilities.map(([number, title, copy, meta], index) => <button key={number} className={`${styles.capability} ${activeCapability === index ? styles.capabilityActive : ""}`} onClick={() => setActiveCapability(index)}><span>{number}</span><h3>{title}</h3><div className={styles.capabilityDetail}><p>{copy}</p><em>{meta} <Arrow/></em></div></button>)}</div></div></div></section>

    <section className={styles.impact}><div className={styles.container}><div className={styles.impactCopy}><div className={styles.sectionLabel}>05 / THE IMPACT</div><h2>Impact is more<br/>than a <i>number.</i></h2><p>Every completed recovery builds a clearer picture of what a connected local network can do.</p><small>Illustrative development data — ready to connect to live platform data.</small></div><div className={styles.dashboard}><div className={styles.dashboardTop}><span>NETWORK IMPACT / YTD</span><span>LIVE DEMO ●</span></div><div className={styles.metrics}><strong>1,240<small>MEALS REDIRECTED</small></strong><strong>438<small>KG DIVERTED</small></strong></div><div className={styles.chart}><span>RECOVERY / MONTH</span><svg viewBox="0 0 420 130" preserveAspectRatio="none" aria-label="Demo recovery chart"><path className={styles.area} d="M0 112 L65 94 L130 101 L195 70 L260 78 L325 36 L420 13 V130 H0Z"/><path d="M0 112 L65 94 L130 101 L195 70 L260 78 L325 36 L420 13"/></svg><div>JAN <b>FEB</b> MAR <b>APR</b> MAY <b>JUN</b> JUL</div></div></div></div></section>

    <section className={styles.directory} id="ngos"><div className={styles.container}><div className={styles.sectionLabel}>06 / THE NETWORK</div><div className={styles.splitHeading}><h2>Organizations at<br/>the <i>other end of recovery.</i></h2><p>Explore a demo directory of the organizations and partners that make local recovery possible.</p></div><div className={styles.directoryTools}><span>DEMO NETWORK DATA — NOT LIVE VERIFICATION</span><label>Location<select value={location} onChange={(event) => setLocation(event.target.value)}><option>All locations</option><option>Koramangala</option><option>Indiranagar</option></select></label><label>Recovery type<select value={type} onChange={(event) => setType(event.target.value)}><option>All recovery types</option><option>Food recovery</option><option>Organic waste</option></select></label></div><div className={styles.directoryContent}><div className={styles.orgList}>{visibleOrganizations.map(([name, orgLocation, kind, status, initials]) => <article key={name}><b>{initials}</b><div><h3>{name} <em>DEMO ✓</em></h3><p>{orgLocation}<i/> {kind}</p></div><span>{status}<Arrow/></span></article>)}</div><MiniMap/></div></div></section>

    <section className={styles.about} id="about"><div className={styles.container}><div className={styles.aboutMark}><Mark/></div><div><div className={styles.sectionLabel}>07 / ABOUT ANNAPURNA</div><h2>Food that still has value <i>shouldn’t automatically become waste.</i></h2><p>Annapurna brings donors, NGOs, volunteers, and processing partners closer to the moments that matter—so responsible recovery is easier to act on.</p><a className={styles.textLink} href="/app-release.apk" download>Download the app <Arrow/></a></div></div></section>

    <section className={styles.download} id="download"><div className={styles.container}><span>08 / JOIN THE NETWORK</span><h2>Make every<br/><i>meal matter.</i></h2><p>Download Annapurna and become part of a recovery network connecting surplus with purpose.</p><a className={styles.store} href="/app-release.apk" download>Download APK <Arrow/></a></div></section>
    <footer className={styles.footer}><div className={styles.container}><a className={styles.brand} href="#top"><Mark/><span>ANNAPURNA</span></a><p>No Food Wasted. Every Meal Matters.</p><div><a href="#infrastructure">Infrastructure</a><a href="#benefits">Benefits</a><a href="#ngos">NGOs</a><a href="#about">About</a></div><small>© 2026 Annapurna. Built for recovery.</small></div></footer>
  </main>;
}
