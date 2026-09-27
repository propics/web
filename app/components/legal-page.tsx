import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getLegalDoc, type LegalKind } from "@/lib/legal-content";
import { Footer, Header } from "./site-shell";

export function legalMetadata(kind: LegalKind, locale: Locale): Metadata {
  const doc = getLegalDoc(kind, locale);
  return { title: doc.pageTitle };
}

export function LegalPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: LegalKind;
}) {
  const doc = getLegalDoc(kind, locale);
  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <Header locale={locale} active={kind} />
      <section className="legal-hero page-hero grid-bg">
        <div className="container">
          <h1>{doc.title}</h1>
          {doc.lastUpdated ? (
            <p className="legal-updated">{doc.lastUpdated}</p>
          ) : null}
          {doc.intro.map((para) => (
            <p className="lead" key={para}>
              {para}
            </p>
          ))}
        </div>
      </section>
      <section className="legal-body grid-bg">
        <div className="container legal-column">
          {doc.sections.map((section) => (
            <article className="legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {section.bullets.length > 0 ? (
                <ul>
                  {section.bullets.map((item, i) => (
                    <li key={`${section.heading}-${i}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  );
}
