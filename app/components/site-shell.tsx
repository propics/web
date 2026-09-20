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
        <Link href={p()} className="brand">
          <img src="/assets/logo.png" alt={t.brand.name} />
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

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const p = (path = "") => localePath(locale, path);

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <img src="/assets/logo.png" alt={t.brand.name} />
          <p>{t.brand.tagline}</p>
        </div>
        <div>
          <h3>{t.footer.platform}</h3>
          <Link href={p("features")}>{t.footer.col1[0]}</Link>
          <Link href={p("about-us")}>{t.footer.col1[1]}</Link>
          <Link href={p("features")}>{t.footer.col1[2]}</Link>
        </div>
        <div>
          <h3>{t.footer.solutions}</h3>
          <a href="#">{t.footer.col2[0]}</a>
          <a href="#">{t.footer.col2[1]}</a>
          <a href="#">{t.footer.col2[2]}</a>
        </div>
        <div>
          <h3>{t.footer.contact}</h3>
          <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
          <a href={`tel:${t.footer.phone}`}>{t.footer.phone}</a>
          <p>{t.footer.country}</p>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>{t.common.allRights}</span>
        <span>
          <Link href="#">{t.common.privacy}</Link> ·{" "}
          <Link href="#">{t.common.terms}</Link>
        </span>
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
