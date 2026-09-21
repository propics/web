import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";
import { Footer, Header, WhatsAppFab } from "./site-shell";

const painIcons = [
  "/assets/pain-leads-v2.png",
  "/assets/pain-visibility-v2.png",
  "/assets/pain-crm-v2.png",
  "/assets/pain-followups-v2.png",
];
const solutionIcons = [
  "/assets/solution-sales.png",
  "/assets/solution-crm.png",
  "/assets/solution-finance.png",
  "/assets/solution-marketing.png",
  "/assets/solution-projects.png",
  "/assets/solution-brokers.png",
];
const stepIcons = [
  "/assets/step-capture.png",
  "/assets/step-sales.png",
  "/assets/step-followup.png",
  "/assets/step-payment.png",
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home;
  const p = (path = "") => localePath(locale, path);
  const secondaryHref =
    h.secondaryCtaHref === "whatsapp"
      ? "https://wa.me/966920032052"
      : p("start-trial");

  return (
    <main>
      <Header locale={locale} active="home" />
      <section className="hero grid-bg">
        <div className="container hero-copy">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>
            {h.heroTitle} <span>{h.heroTitleHighlight}</span>
          </h1>
          <p className="lead">{h.heroLead}</p>
          <div className="actions">
            <Link className="button primary" href={p("book-demo")}>
              {h.primaryCta}
            </Link>
            <Link className="button ghost" href={secondaryHref}>
              {h.secondaryCta}
            </Link>
          </div>
          <img
            className="hero-product"
            src="/assets/propics-dashboard.webp"
            alt="Propics dashboard"
          />
        </div>
      </section>

      <section className="section section-problems grid-bg">
        <div className="container split">
          <div>
            <h2>
              {h.painTitle} <span>{h.painTitleHighlight}</span>
            </h2>
            <p className="lead left">
              {h.painLead.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="card-grid pain-grid">
            {h.painPoints.map((title, i) => (
              <article className="pain-card" key={title}>
                <div className="icon-panel">
                  <img src={painIcons[i]} alt="" />
                </div>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section grid-bg centered">
        <div className="container">
          <h2>
            {h.standardTitle}
            <br />
            <span>{h.standardTitleHighlight}</span>
          </h2>
          <p className="lead">{h.standardLead}</p>
          <div
            className="position-card"
            aria-label="Propics is specialized and easy to use"
          >
            <div className="position-grid">
              <div className="quad quad-tl">{h.quadrantGenericCrm}</div>
              <div className="quad quad-tr highlight matrix-brand">
                <img src="/assets/logo-mark.png?v=exact" alt="Propics" />
              </div>
              <div className="quad quad-bl">{h.quadrantErp}</div>
              <div className="quad quad-br">{h.quadrantExcel}</div>
            </div>
            <div className="position-axes" aria-hidden="true">
              <span className="axis axis-v" />
              <span className="axis axis-h" />
            </div>
            <span className="axis-label label-top">{h.axisSpecialized}</span>
            <span className="axis-label label-bottom">{h.axisGeneric}</span>
            <span className="axis-label label-left">{h.axisHard}</span>
            <span className="axis-label label-right">{h.axisEasy}</span>
          </div>
          <p className="section-note">{h.standardNote}</p>
        </div>
      </section>

      <section className="section turquoise-section centered">
        <div className="container">
          <h2>
            <span className="white">{h.solutionsTitleWhite}</span>
            <br />
            {h.solutionsTitleRest}
          </h2>
          <p className="lead dark">{h.solutionsLead}</p>
          <div className="solutions-grid">
            {h.solutions.map((title, i) => (
              <article className="solution-card" key={title}>
                <img src={solutionIcons[i]} alt="" />
                <h3>{title}</h3>
              </article>
            ))}
          </div>
          <p className="solutions-note">{h.solutionsNote}</p>
        </div>
      </section>

      <section className="section grid-bg centered">
        <div className="container">
          <h2>
            {h.journeyTitle}
            <br />
            <span>{h.journeyTitleHighlight}</span>
          </h2>
          <div className="timeline">
            <img className="timeline-line" src="/assets/timeline-path.png" alt="" />
            {h.journeySteps.map((step, i) => (
              <article key={step.title}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <img src={stepIcons[i]} alt="" />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section grid-bg centered">
        <div className="container">
          <h2>
            {h.impactTitle} <span>{h.impactTitleHighlight}</span>
          </h2>
          <p className="lead">{h.impactLead}</p>
          <div className="stats">
            {h.stats.map((s) => (
              <article key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </article>
            ))}
          </div>
          <p className="impact-note">{h.impactNote}</p>
          <div className="trusted">
            <h2>
              {h.trustedTitle}
              <br />
              <span>{h.trustedTitleHighlight}</span>
            </h2>
            <div className="testimonials">
              {[0, 1, 2].map((i) => (
                <article key={i}>
                  <p>“{h.testimonial}”</p>
                  <div className="testimonial-meta">
                    <b className="avatar">{h.testimonialName.charAt(0)}</b>
                    <span>
                      <i>★★★★★</i>
                      <small>
                        <strong>{h.testimonialName}</strong> · {h.testimonialRole}
                      </small>
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <p className="trusted-note">{h.trustedNote}</p>
          </div>
        </div>
      </section>

      <section className="section cta grid-bg">
        <div className="container split cta-inner">
          <div>
            <h2>
              {h.ctaTitle} <span>{h.ctaTitleHighlight}</span>
            </h2>
            <p className="lead left">{h.ctaLead}</p>
            <div className="actions left-actions">
              <Link className="button primary" href={p("book-demo")}>
                {t.common.bookDemo}
              </Link>
              <a className="button ghost" href="https://wa.me/966920032052">
                {t.common.chatWhatsapp}
              </a>
            </div>
          </div>
          <div className="cta-devices">
            <img src="/assets/feature-cta-laptop.png" alt="Propics dashboard" />
            <img src="/assets/feature-cta-mobile.png" alt="Propics mobile" />
          </div>
        </div>
      </section>
      <WhatsAppFab />
      <Footer locale={locale} />
    </main>
  );
}
