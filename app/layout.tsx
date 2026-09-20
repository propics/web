import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Propics | Real Estate Sales & CRM",
  description: "Propics is a specialized real estate sales and CRM platform.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
