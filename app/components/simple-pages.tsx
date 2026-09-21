import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { ContactForm } from "./contact-form";
import { Footer, Header, WhatsAppFab } from "./site-shell";
import { TrialForm } from "./trial-form";

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
      <section className="content-section contact-section grid-bg">
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
  return (
    <main>
      <Header locale={locale} />
      <section className="trial-page grid-bg">
        <div className="container">
          <TrialForm locale={locale} />
        </div>
      </section>
      <WhatsAppFab />
      <Footer locale={locale} />
    </main>
  );
}
