import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Propics | Real Estate Sales & CRM",
  description: "Propics is a specialized real estate sales and CRM platform.",
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
