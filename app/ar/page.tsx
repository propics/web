import type { Metadata } from "next";
import { HomePage } from "../components/home-page";

export default function HomeAr() {
  return <HomePage locale="ar" />;
}

export const metadata: Metadata = {
 title: "نظام CRM عقاري وإدارة المبيعات العقارية | بروبكس",
 description: "بروبكس نظام CRM عقاري لإدارة العملاء والمشاريع والوحدات والمبيعات والحجوزات في السعودية. احجز عرضًا تجريبيًا الآن.",
 alternates: { canonical: "https://propics.sa/ar", languages: { ar: "https://propics.sa/ar", en: "https://propics.sa/", "x-default": "https://propics.sa/" } },
 openGraph: { title: "نظام CRM عقاري وإدارة المبيعات العقارية | بروبكس", description: "حل متكامل لإدارة العملاء والمبيعات العقارية في السعودية.", url: "https://propics.sa/ar", locale: "ar_SA" },
};
