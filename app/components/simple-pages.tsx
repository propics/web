import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";
import { BookingForm } from "./booking-form";
import { Footer, Header } from "./site-shell";

export function BlogPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <main>
      <Header locale={locale} active="blog" />
      <section className="empty-state grid-bg">
        <h1>{t.blog.title}</h1>
        <p>{t.blog.body}</p>
      </section>
      <Footer locale={locale} />
    </main>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <main>
      <Header locale={locale} active="contact" />
      <section className="trial-page grid-bg">
        <div className="container">
          <div className="info-card" style={{ marginBottom: 28 }}>
            <h2>{t.nav.contact}</h2>
            <p>
              <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
            </p>
            <p>
              <a href={`tel:${t.footer.phone}`}>{t.footer.phone}</a>
            </p>
            <p>{t.footer.country}</p>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}

export function TrialPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = (path = "") => localePath(locale, path);
  return (
    <main>
      <Header locale={locale} />
      <section className="page-hero grid-bg">
        <div className="container">
          <p className="eyebrow">{t.trial.eyebrow}</p>
          <h1>
            {t.trial.title} <span>{t.trial.titleHighlight}</span>
          </h1>
          <p>{t.trial.lead}</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container form-layout">
          <div className="info-card">
            <h2>{t.trial.infoTitle}</h2>
            <ul>
              {t.trial.infoItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="actions" style={{ marginTop: 24 }}>
              <Link className="button primary" href={p("book-demo")}>
                {t.common.bookDemo}
              </Link>
            </div>
          </div>
          <BookingForm locale={locale} />
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
