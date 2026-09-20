import Link from "next/link";
import { Footer, Header } from "./components/site-shell";

const painPoints = [
  ["/assets/pain-leads-v2.png", "Leads scattered across Excel & WhatsApp"],
  ["/assets/pain-visibility-v2.png", "No visibility on deals & team performance"],
  ["/assets/pain-crm-v2.png", "Generic CRM doesn't match real estate needs"],
  ["/assets/pain-followups-v2.png", "Missed follow-ups mean lost deals"],
];
const solutions = [
  ["/assets/solution-sales.png", "Sales"], ["/assets/solution-crm.png", "CRM"],
  ["/assets/solution-finance.png", "Finance"], ["/assets/solution-marketing.png", "Marketing"],
  ["/assets/solution-projects.png", "Projects"], ["/assets/solution-brokers.png", "Brokers"],
];

export default function Home() {
  return <main>
    <Header active="home" />
    <section className="hero grid-bg"><div className="container hero-copy">
      <p className="eyebrow">Real estate sales system with built-in CRM capabilities</p>
      <h1>Designed specifically for <span>real estate sector</span></h1>
      <p className="lead">Manage leads, units, clients, and sales all in one specialized platform built for real estate.</p>
      <div className="actions"><Link className="button primary" href="/book-demo">Book Demo</Link><Link className="button ghost" href="/start-trial">Start free trial</Link></div>
      <img className="hero-product" src="/assets/propics-dashboard.webp" alt="Propics dashboard shown on a laptop" />
    </div></section>
    <section className="section grid-bg"><div className="container split"><div><h2>Your real estate sales process is more <span>complex than it should be</span></h2><p className="lead left">You don't need another tool.<br />You need a system built for real estate.</p></div><div className="card-grid pain-grid">{painPoints.map(([icon,title]) => <article className="pain-card" key={title}><div className="icon-panel"><img src={icon} alt="" /></div><h3>{title}</h3></article>)}</div></div></section>
    <section className="section grid-bg centered"><div className="container"><h2>A new standard for real estate<br /><span>sales systems</span></h2><p className="lead">Built for specialization - without complexity</p><div className="position-card" aria-label="Propics is specialized and easy to use"><span className="axis axis-v" aria-hidden="true"></span><span className="axis axis-h" aria-hidden="true"></span><span className="axis-label label-top">Specialized</span><span className="axis-label label-bottom">Generic</span><span className="axis-label label-left">Hard to Use</span><span className="axis-label label-right">Easy to Use</span><div>Generic CRM</div><div className="highlight"><img src="/assets/logo.png" alt="Propics" /></div><div>ERP</div><div>Excel / Manual</div></div><p className="section-note">Propics combines real estate specialization with operational simplicity.</p></div></section>
    <section className="section turquoise-section centered"><div className="container"><h2><span className="white">6 Solutions in</span><br />One Platform</h2><p className="lead dark">Bring sales, clients, properties, and operations together in one powerful platform.</p><div className="solutions-grid">{solutions.map(([icon,title]) => <article className="solution-card" key={title}><img src={icon} alt="" /><h3>{title}</h3></article>)}</div></div></section>
    <section className="section grid-bg centered"><div className="container narrow"><h2>From Lead to Deal<br /><span>Fully Managed</span></h2><div className="timeline"><img className="timeline-line" src="/assets/timeline-path.png" alt="" /><article><b>01</b><img src="/assets/step-capture.png" alt="" /><div><h3>Capture & Organize Leads</h3><p>Bring all your leads into one structured system.</p></div></article><article><b>02</b><img src="/assets/step-sales.png" alt="" /><div><h3>Track Sales, Units & Clients</h3><p>Manage properties, availability, and deal progress.</p></div></article><article><b>03</b><img src="/assets/step-followup.png" alt="" /><div><h3>Follow Up & Convert Faster</h3><p>Automate tasks and never miss opportunities.</p></div></article><article><b>04</b><img src="/assets/step-payment.png" alt="" /><div><h3>Payment</h3><p>Close deals seamlessly.</p></div></article></div></div></section>
    <section className="section grid-bg centered"><div className="container"><h2>Measurable <span>Impact</span></h2><p className="lead">Real results that directly impact your sales performance.</p><div className="stats"><article><strong>-70%</strong><span>Time Reduced</span></article><article><strong>+40%</strong><span>Faster Sales</span></article><article><strong>-95%</strong><span>Fewer Errors</span></article></div><p className="impact-note">Close more deals with less effort</p><div className="trusted"><h2>Trusted by Real Estate<br /><span>Teams</span></h2><div className="testimonials"><article><p>“We improved our sales conversion and team visibility within weeks of using Propics.”</p><div><b className="avatar">Z</b><span><i>★★★★★</i><small><strong>Zakaria</strong> · Sales Director</small></span></div></article><article><p>“We improved our sales conversion and team visibility within weeks of using Propics.”</p><div><b className="avatar">Z</b><span><i>★★★★★</i><small><strong>Zakaria</strong> · Sales Director</small></span></div></article><article><p>“We improved our sales conversion and team visibility within weeks of using Propics.”</p><div><b className="avatar">Z</b><span><i>★★★★★</i><small><strong>Zakaria</strong> · Sales Director</small></span></div></article></div><p className="trusted-note">We improved conversion and visibility instantly.</p></div></div></section>
    <section className="section cta grid-bg"><div className="container split cta-inner"><div><h2>Ready to take control of your <span>real estate sales?</span></h2><p className="lead left">See how Propics helps you manage leads, track units, and close deals faster â€” all in one system.</p><div className="actions left-actions"><Link className="button primary" href="/book-demo">Book Demo</Link><a className="button ghost" href="https://wa.me/966920032052">Chat on WhatsApp</a></div></div><img src="/assets/propics-dashboard.webp" alt="Propics sales system" /></div></section>
    <a className="whatsapp" href="https://wa.me/966920032052" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12.7 12.7 0 0 0-10.9 19.2L3.4 28l6-1.6A12.8 12.8 0 1 0 16 3Zm0 23.2a10.4 10.4 0 0 1-5.3-1.5l-.4-.2-3.5.9 1-3.4-.3-.4A10.5 10.5 0 1 1 16 26.2Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4Z"/></svg></a>
    <Footer />
  </main>;
}










