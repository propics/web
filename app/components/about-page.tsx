import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";
import { Footer, Header, WhatsAppFab } from "./site-shell";

const teamIcons = [
  "/assets/about-developers.png",
  "/assets/about-brokers.png",
  "/assets/about-sales-teams.png",
];
const problemIcons = [
  "/assets/about-problem-generic-tools.png",
  "/assets/about-problem-crm.png",
  "/assets/about-problem-missed-followups.png",
];
const purposeIcons = [
  "/assets/about-purpose-leads.png",
  "/assets/about-purpose-units.png",
  "/assets/about-purpose-lifecycle.png",
  "/assets/about-purpose-progress.png",
];

export function AboutPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.about;
  const p = (path = "") => localePath(locale, path);

  return (
    <main>
      <Header locale={locale} active="about" />
      <section className="about-hero grid-bg centered">
        <div className="container">
          <p className="eyebrow">{a.eyebrow}</p>
          <h1>
            {a.heroTitle} <span>{a.heroTitleHighlight}</span> {a.heroTitleRest}
          </h1>
          <p className="lead">{a.heroLead}</p>
          <div className="actions">
            <Link className="button primary" href={p("book-demo")}>
              {t.common.bookDemo}
            </Link>
            <a className="button ghost" href="https://wa.me/966920032052">
              {t.common.chatWhatsapp}
            </a>
          </div>
          <img
            className="hero-product"
            src="/assets/propics-dashboard.webp"
            alt="Propics Dashboard"
          />
        </div>
      </section>

      <section className="about-teams grid-bg">
        <div className="container split">
          <div>
            <h2>
              {a.teamsTitle}
              <br />
              <span>{a.teamsTitleHighlight}</span>
            </h2>
            <p>{a.teamsLead}</p>
          </div>
          <div className="team-cards">
            {a.teams.map((name, i) => (
              <article key={name}>
                <img src={teamIcons[i]} alt="" />
                <b>{name}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-problem grid-bg centered">
        <div className="container">
          <h2>
            {a.problemTitle}
            <br />
            <span>{a.problemTitleHighlight}</span>
          </h2>
          <div className="about-problem-grid">
            {a.problems.map((text, i) => (
              <article key={text}>
                <img src={problemIcons[i]} alt="" />
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="about-propics-card">
            <div className="about-propics-logo">
              <img src="/assets/logo-mark.png?v=exact" alt="Propics" />
            </div>
            <p>{a.propicsCard}</p>
            <small>{a.propicsCardSmall}</small>
          </div>
          <p className="about-note">{a.aboutNote}</p>
        </div>
      </section>

      <section className="purpose-section grid-bg centered">
        <div className="container">
          <h2>
            {a.purposeTitle}
            <br />
            <span>{a.purposeTitleRest}</span>
          </h2>
          <p>{a.purposeLead}</p>
          <div className="purpose-grid">
            {a.purposeItems.map((item, i) => (
              <article key={item}>
                <img src={purposeIcons[i]} alt="" />
                <b>{item}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-section grid-bg">
        <div className="container">
          <div className="mission-grid">
            <article>
              <h3>{a.missionTitle}</h3>
              <p>{a.missionBody}</p>
            </article>
            <article>
              <h3>{a.visionTitle}</h3>
              <p>{a.visionBody}</p>
            </article>
          </div>
          <h2 className="why-title">
            {a.whyTitle}
            <br />
            <span>{a.whyTitleHighlight}</span>
          </h2>
          <ul className="why-list">
            {a.whyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-cta grid-bg">
        <div className="container split">
          <div>
            <h2>
              {a.ctaTitle}
              <br />
              <span>{a.ctaTitleHighlight}</span>
            </h2>
            <p>{a.ctaLead}</p>
            <div className="actions">
              <Link className="button primary" href={p("book-demo")}>
                {t.common.bookDemo}
              </Link>
              <a className="button ghost" href="https://wa.me/966920032052">
                {t.common.chatWhatsapp}
              </a>
            </div>
          </div>
          <div className="cta-devices">
            <img src="/assets/feature-cta-laptop.png" alt="" />
            <img src="/assets/feature-cta-mobile.png" alt="" />
          </div>
        </div>
      </section>
      <WhatsAppFab />
      <Footer locale={locale} />
    </main>
  );
}
