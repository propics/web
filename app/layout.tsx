import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://propics.sa/#organization",
      name: "Propics",
      alternateName: "بروبكس",
      url: "https://propics.sa/",
      logo: "https://propics.sa/assets/logo-mark.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+966920032052",
        email: "info@propics.co",
        availableLanguage: ["Arabic", "English"],
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://propics.sa/#software",
      name: "Propics",
      url: "https://propics.sa/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Real estate CRM and sales management software for real estate developers and sales teams.",
      publisher: { "@id": "https://propics.sa/#organization" },
    },
  ],
};


export const metadata: Metadata = {
  metadataBase: new URL("https://propics.sa"),
  title: "Real Estate CRM & Sales Management Software | Propics",
  description: "Propics helps Saudi real estate developers and sales teams manage leads, properties, sales, and bookings in one CRM platform.",
  applicationName: "Propics",
  openGraph: { type: "website", siteName: "Propics", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const fromHeader = headerList.get("x-locale") === "ar";
  const locale = fromHeader ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var p=location.pathname;var ar=p==='/ar'||p.indexOf('/ar/')===0;document.documentElement.lang=ar?'ar':'en';document.documentElement.dir=ar?'rtl':'ltr';})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
