import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { BookingForm } from "./booking-form";
import { Footer, Header, WhatsAppFab } from "./site-shell";

export function BookDemoPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const b = t.bookDemo;

  return (
    <main>
      <Header locale={locale} active="book-demo" />
      <section className="demo-hero grid-bg centered">
        <div className="container">
          <p className="eyebrow">{b.eyebrow}</p>
          <h1>
            {b.heroTitle}
            <br />
            <span>{b.heroTitleHighlight}</span>
          </h1>
        </div>
      </section>
      <section className="demo-content grid-bg">
        <div className="container">
          <div className="demo-benefits">
            <h3>{b.benefitsTitle}</h3>
            <div>
              {b.benefits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <BookingForm locale={locale} />
        </div>
      </section>
      <WhatsAppFab />
      <Footer locale={locale} />
    </main>
  );
}
