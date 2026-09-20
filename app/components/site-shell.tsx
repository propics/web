import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath, switchLocalePath } from "@/lib/i18n";

type Active = "home" | "features" | "about" | "blog" | "contact" | "book-demo";

function pathForActive(locale: Locale, active?: Active): string {
  if (!active || active === "home") return localePath(locale);
  if (active === "about") return localePath(locale, "about-us");
  if (active === "book-demo") return localePath(locale, "book-demo");
  return localePath(locale, active);
}

function BrandMark({
  locale,
  variant = "header",
}: {
  locale: Locale;
  variant?: "header" | "footer";
}) {
  const t = getDictionary(locale);
  return (
    <span className={`brand-mark brand-mark-${variant}`}>
      <img
        src="/assets/logo-mark.png?v=clean"
        alt={t.brand.name}
        className="brand-icon"
      />
    </span>
  );
}

export function Header({
  locale = "en",
  active,
}: {
  locale?: Locale;
  active?: Active;
}) {
  const t = getDictionary(locale);
  const p = (path = "") => localePath(locale, path);
  const other = switchLocalePath(locale, pathForActive(locale, active));

  return (
    <header className="site-header">
      <nav className="nav container" aria-label={t.nav.mainNav}>
        <Link href={p()} className="brand" aria-label={t.brand.name}>
          <BrandMark locale={locale} variant="header" />
        </Link>
        <input
          type="checkbox"
          id="nav-toggle"
          className="nav-toggle"
          aria-label={t.nav.toggleMenu}
        />
        <label htmlFor="nav-toggle" className="hamburger" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="nav-dropdown">
          <div className="nav-links">
            <Link className={active === "home" ? "active" : ""} href={p()}>
              {t.nav.home}
            </Link>
            <Link
              className={active === "features" ? "active" : ""}
              href={p("features")}
            >
              {t.nav.features}
            </Link>
            <Link
              className={active === "about" ? "active" : ""}
              href={p("about-us")}
            >
              {t.nav.about}
            </Link>
            <Link className={active === "blog" ? "active" : ""} href={p("blog")}>
              {t.nav.blog}
            </Link>
          </div>
          <div className="nav-actions">
            <Link className="button light" href={p("contact")}>
              {t.nav.contact}
            </Link>
            <Link className="button black" href={p("book-demo")}>
              {t.nav.bookDemo}
            </Link>
            <Link
              className="button ghost lang-switch"
              href={other}
              hrefLang={locale === "en" ? "ar" : "en"}
              aria-label={t.nav.langSwitchAria}
            >
              {t.nav.langSwitch}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.56 3.5.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V8l-8 5-8-5z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const p = (path = "") => localePath(locale, path);
  // EN LTR: Contact | Ops | Sales | About. AR dict is reversed so RTL shows About on the right.
  const hrefGroups =
    locale === "ar"
      ? [
          [p("about-us"), p("about-us"), p("features")],
          [p("features"), p("features"), p("features")],
          [p("features"), p("features"), p("features")],
          [p("contact"), "#", "#"],
        ]
      : [
          [p("contact"), "#", "#"],
          [p("features"), p("features"), p("features")],
          [p("features"), p("features"), p("features")],
          [p("about-us"), p("about-us"), p("features")],
        ];
  const labelGroups = [t.footer.col1, t.footer.col2, t.footer.col3, t.footer.col4];
  const columns = labelGroups.map((labels, i) => ({
    links: labels.map((label, j) => ({ label, href: hrefGroups[i][j] })),
  }));

  return (
    <footer className="site-footer">
      <div className="container footer-links">
        {columns.map((col, i) => (
          <div key={i} className="footer-col">
            {col.links.map((link) =>
              link.href === "#" ? (
                <a key={link.label} href="#">
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="container footer-meta">
        <div className="footer-contact">
          <a href={`tel:${t.footer.phone}`}>
            <PhoneIcon />
            <span>{t.footer.phone}</span>
          </a>
          <a href={`mailto:${t.footer.email}`}>
            <MailIcon />
            <span>{t.footer.email}</span>
          </a>
          <span className="footer-country">
            <PinIcon />
            <span>{t.footer.country}</span>
          </span>
        </div>
        <Link href={p()} className="footer-brand" aria-label={t.brand.name}>
          <BrandMark locale={locale} variant="footer" />
        </Link>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      className="whatsapp"
      href="https://wa.me/966920032052"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3a12.7 12.7 0 0 0-10.9 19.2L3.4 28l6-1.6A12.8 12.8 0 1 0 16 3Zm0 23.2a10.4 10.4 0 0 1-5.3-1.5l-.4-.2-3.5.9 1-3.4-.3-.4A10.5 10.5 0 1 1 16 26.2Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4Z" />
      </svg>
    </a>
  );
}
