import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { getWhyCopy } from "@/lib/why-propics";
import { Footer, Header, WhatsAppFab } from "./site-shell";

const flowIcons = [
  "/assets/step-capture.png",
  "/assets/about-purpose-client-lifecycle.png",
  "/assets/feature-requests.png",
  "/assets/feature-reservation.png",
  "/assets/step-payment.png",
  "/assets/step-sales.png",
];

const projectImages = [
  "/assets/solution-projects.png",
  "/assets/feature-property.png",
  "/assets/about-purpose-unit-inventory.png",
  "/assets/about-purpose-units.png",
];

const stakeholderIcons = [
  "/assets/about-sales-teams.png",
  "/assets/about-brokers.png",
  "/assets/solution-finance.png",
  "/assets/about-purpose-client-lifecycle.png",
  "/assets/solution-marketing.png",
];

const automateIcons = [
  "/assets/solution-sales.png",
  "/assets/feature-property.png",
  "/assets/step-followup.png",
  "/assets/feature-reservation.png",
  "/assets/feature-requests.png",
];

const journeyIcons = [
  "/assets/about-purpose-unit-inventory.png",
  "/assets/solution-sales.png",
  "/assets/about-purpose-followups-progress.png",
  "/assets/step-payment.png",
];

const enterpriseIcons = [
  "/assets/pain-visibility-v2.png",
  "/assets/feature-access.png",
  "/assets/about-purpose-followups-progress.png",
  "/assets/about-problem-crm.png",
];

function FlowArrow({ direction }: { direction: "right" | "down" | "left" }) {
  const rotation =
    direction === "down" ? "90" : direction === "left" ? "180" : "0";
  return (
    <span className={`why-flow-arrow why-flow-arrow-${direction}`} aria-hidden="true">
      <i style={{ transform: `rotate(${rotation}deg)` }} />
    </span>
  );
}

export function WhyPropicsPage({ locale }: { locale: Locale }) {
  const w = getWhyCopy(locale);
  const p = (path = "") => localePath(locale, path);
  const topSteps = w.flowSteps.slice(0, 3);
  const bottomSteps = [w.flowSteps[5], w.flowSteps[4], w.flowSteps[3]];
  const bottomIcons = [flowIcons[5], flowIcons[4], flowIcons[3]];

  return (
    <main className="why-page" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <Header locale={locale} active="why-propics" />

      <section id="what-is-propics" className="why-hero page-hero grid-bg centered">
        <div className="container">
          <p className="eyebrow">{w.heroEyebrow}</p>
          <h1>
            {w.heroTitle}
          </h1>
          <p className="lead">{w.heroLead}</p>
          <div className="actions">
            <Link className="button primary" href={p("book-demo")}>
              {w.bookDemo}
            </Link>
            <Link className="button ghost" href={p("features")}>
              {w.exploreFeatures}
            </Link>
          </div>
          <img
            className="why-hero-laptop"
            src="/assets/feature-cta-laptop.png"
            alt=""
          />
        </div>
      </section>

      <section className="why-flow-section grid-bg centered">
        <div className="container">
          <h2 className="section-title">{w.flowTitle}</h2>
          <p className="lead">{w.flowLead}</p>
          <div className="why-flow">
            <div className="why-flow-row">
              {topSteps.map((step, i) => (
                <div className="why-flow-item" key={step.title}>
                  <article className="why-flow-card">
                    <h3>{step.title}</h3>
                    <img src={flowIcons[i]} alt="" />
                    <p>{step.body}</p>
                  </article>
                  {i < topSteps.length - 1 ? <FlowArrow direction="right" /> : null}
                </div>
              ))}
            </div>
            <div className="why-flow-turn">
              <FlowArrow direction="down" />
            </div>
            <div className="why-flow-row why-flow-row-back">
              {bottomSteps.map((step, i) => (
                <div className="why-flow-item" key={step.title}>
                  <article className="why-flow-card">
                    <h3>{step.title}</h3>
                    <img src={bottomIcons[i]} alt="" />
                    <p>{step.body}</p>
                  </article>
                  {i < bottomSteps.length - 1 ? (
                    <FlowArrow direction="left" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <p className="section-note">{w.flowNote}</p>
        </div>
      </section>

      <section className="why-projects grid-bg centered">
        <div className="container">
          <h2 className="section-title">
            {w.projectsTitle}
            <br />
            <span>{w.projectsTitleHighlight}</span>
          </h2>
          <p className="lead">{w.projectsLead}</p>
          <div className="why-project-grid">
            {w.projects.map((label, i) => (
              <article key={label}>
                <img src={projectImages[i]} alt="" />
                <b>{label}</b>
              </article>
            ))}
          </div>
          <p className="section-note">{w.projectsNote}</p>
        </div>
      </section>

      <section className="why-stakeholders centered">
        <div className="container">
          <h2 className="section-title">
            {w.stakeholdersTitle}
            <br />
            <span>{w.stakeholdersTitleHighlight}</span>
          </h2>
          <p className="lead">{w.stakeholdersLead}</p>
          <div className="why-stake-grid">
            {w.stakeholders.map((item, i) => (
              <article key={item.title}>
                <img src={stakeholderIcons[i]} alt="" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="section-note">{w.stakeholdersNote}</p>
        </div>
      </section>

      <section className="why-automate grid-bg centered">
        <div className="container">
          <h2 className="section-title">{w.automateTitle}</h2>
          <p className="lead">{w.automateLead}</p>
          <div className="why-auto-grid">
            {w.automateItems.map((item, i) => (
              <article key={item.title}>
                <header>
                  <h3>{item.title}</h3>
                  <img src={automateIcons[i]} alt="" />
                </header>
                <p>{item.body}</p>
              </article>
            ))}
            <p className="why-auto-aside">{w.automateNote}</p>
          </div>
        </div>
      </section>

      <section className="why-journey grid-bg">
        <div className="container why-journey-split">
          <div>
            <h2 className="section-title">
              {w.journeyTitle}
              <br />
              <span>{w.journeyTitleHighlight}</span>
            </h2>
            <p className="lead left">{w.journeyLead}</p>
            <p className="section-note">{w.journeyNote}</p>
            <div className="actions left-actions">
              <Link className="button primary" href={p("book-demo")}>
                {w.bookDemo}
              </Link>
              <a className="button ghost" href="https://wa.me/966920032052">
                {w.chatWhatsapp}
              </a>
            </div>
          </div>
          <ol className="why-journey-steps">
            {w.journeySteps.map((step, i) => (
              <li key={step.title}>
                <img src={journeyIcons[i]} alt="" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="why-easy grid-bg">
        <div className="container why-easy-split">
          <img src="/assets/feature-cta-laptop.png" alt="" />
          <div>
            <h2 className="section-title">{w.easyTitle}</h2>
            <p className="lead left">{w.easyLead}</p>
            <ul className="why-easy-list">
              {w.easyChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="section-note">{w.easyNote}</p>
          </div>
        </div>
      </section>

      <section className="why-enterprise grid-bg centered">
        <div className="container">
          <h2 className="section-title">
            {w.enterpriseTitle}
            <br />
            <span>{w.enterpriseTitleHighlight}</span>
          </h2>
          <p className="lead">{w.enterpriseLead}</p>
          <div className="why-ent-grid">
            {w.enterpriseItems.map((label, i) => (
              <article key={label}>
                <img src={enterpriseIcons[i]} alt="" />
                <b>{label}</b>
              </article>
            ))}
          </div>
          <p className="section-note">{w.enterpriseNote}</p>
        </div>
      </section>

      <section id="why-propics" className="why-choose turquoise-section centered">
        <div className="container">
          <h2 className="section-title">
            {w.whyTitle}
            <br />
            <span className="white">{w.whyTitleHighlight}</span>
          </h2>
          <p className="lead dark">{w.whyLead}</p>
          <ul className="why-choose-list">
            {w.whyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="why-cta about-cta grid-bg">
        <div className="container split">
          <div>
            <h2 className="section-title">{w.ctaTitle}</h2>
            <p>{w.ctaLead}</p>
            <div className="actions">
              <Link className="button primary" href={p("book-demo")}>
                {w.bookDemo}
              </Link>
              <a className="button ghost" href="https://wa.me/966920032052">
                {w.chatWhatsapp}
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
