import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";
import { BookingForm } from "./booking-form";
import { ContactForm } from "./contact-form";
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
  const c = t.contact;
  const info = [
    {
      label: c.emailLabel,
      value: t.footer.email,
      href: `mailto:${t.footer.email}`,
    },
    {
      label: c.phoneLabel,
      value: t.footer.phone,
      href: `tel:${t.footer.phone}`,
    },
    {
      label: c.locationLabel,
      value: t.footer.country,
      href: undefined as string | undefined,
    },
  ];

  return (
    <main>
      <Header locale={locale} active="contact" />
      <section className="page-hero contact-hero grid-bg">
        <div className="container">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>
            {c.title} <span>{c.titleHighlight}</span>
          </h1>
          <p className="lead">{c.lead}</p>
        </div>
      </section>
      <section className="content-section contact-section">
        <div className="container contact-layout">
          <div className="contact-info-grid">
            {info.map((item) => (
              <article className="contact-info-card" key={item.label}>
                <h3>{item.label}</h3>
                {item.href ? (
                  <a href={item.href}>{item.value}</a>
                ) : (
                  <p>{item.value}</p>
                )}
              </article>
            ))}
          </div>
          <ContactForm locale={locale} />
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
