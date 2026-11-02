import type { Metadata } from "next";
import { HomePage } from "./components/home-page";

export default function Home() {
  return <HomePage locale="en" />;
}

export const metadata: Metadata = {
 title: "Real Estate CRM & Sales Management Software | Propics",
 description: "Propics is a real estate CRM platform for developers and sales teams in Saudi Arabia. Manage leads, property inventory, sales and bookings.",
 alternates: { canonical: "https://propics.sa/", languages: { en: "https://propics.sa/", ar: "https://propics.sa/ar", "x-default": "https://propics.sa/" } },
 openGraph: { title: "Real Estate CRM & Sales Management Software | Propics", description: "Manage leads, properties, sales and bookings in one real estate CRM.", url: "https://propics.sa/", locale: "en_US" },
};
