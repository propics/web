import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";
import { Footer, Header, WhatsAppFab } from "./site-shell";

export function FeaturesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const f = t.features;
  const p = (path = "") => localePath(locale, path);

  return (
    <main>
      <Header locale={locale} active="features" />
      <section className="features-hero grid-bg centered">
        <div className="container">
          <p className="eyebrow">{f.eyebrow}</p>
          <h1>
            {f.heroTitle}
            <br />
            <span>{f.heroTitleHighlight}</span>
          </h1>
          <p className="lead">{f.heroLead}</p>
          <div className="actions">
            <Link className="button primary" href={p("book-demo")}>
              {t.common.bookDemo}
            </Link>
            <a className="button ghost" href="https://wa.me/966920032052">
              {t.common.chatWhatsapp}
            </a>
          </div>
          <img
            className="features-hero-image"
            src="/assets/propics-dashboard.webp"
            alt="Propics Dashboard"
          />
        </div>
      </section>

      <section className="feature-showcase grid-bg">
        <div className="container">
          {f.items.map((item, index) => (
            <article
              className={"feature-row " + (index % 2 ? "reverse" : "")}
              key={item.title + item.titleHighlight}
            >
              <div className="feature-copy">
                <h2>
                  {item.title} <span>{item.titleHighlight}</span>
                </h2>
                <p>{item.desc}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <img
                className="feature-media"
                src={item.image}
                alt={`${item.title} ${item.titleHighlight}`}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="features-cta grid-bg">
        <div className="container feature-row">
          <div className="feature-copy">
            <h2>
              {f.ctaTitle} <span>{f.ctaTitleHighlight}</span>
            </h2>
            <p>{f.ctaLead}</p>
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
