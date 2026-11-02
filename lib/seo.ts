import type { Metadata } from "next";

export type SeoPage = "about-us" | "features" | "why-propics" | "contact" | "book-demo" | "start-trial" | "privacy" | "terms" | "blog";
type Locale = "ar" | "en";

const labels: Record<SeoPage, Record<Locale, [string, string]>> = {
  "about-us": { ar: ["عن بروبكس | نظام إدارة المبيعات العقارية", "تعرّف على بروبكس، منصة إدارة العملاء والمبيعات للمطورين والفرق العقارية في السعودية."], en: ["About Propics | Real Estate Sales CRM", "Learn how Propics supports real estate sales teams with CRM, property inventory and sales workflows."] },
  features: { ar: ["مميزات نظام CRM العقاري | بروبكس", "اكتشف مميزات بروبكس لإدارة العملاء والمشاريع والوحدات العقارية والمبيعات والحجوزات."], en: ["Real Estate CRM Features | Propics", "Explore Propics tools for managing real estate leads, inventory, bookings and sales workflows."] },
  "why-propics": { ar: ["لماذا بروبكس لإدارة المبيعات العقارية؟", "اكتشف كيف يساعدك بروبكس على تنظيم عمليات المبيعات العقارية ومتابعة العملاء والوحدات."], en: ["Why Choose Propics Real Estate CRM?", "Discover why real estate developers and sales teams choose Propics to manage customers and sales."] },
  contact: { ar: ["تواصل مع بروبكس | حلول CRM العقاري", "تواصل مع فريق بروبكس للاستفسار عن نظام إدارة العملاء والمبيعات العقارية."], en: ["Contact Propics | Real Estate CRM", "Get in touch with the Propics team about real estate CRM and sales management solutions."] },
  "book-demo": { ar: ["احجز عرضًا تجريبيًا لنظام بروبكس العقاري", "احجز عرضًا تجريبيًا لتتعرف على أدوات بروبكس لإدارة العملاء والمبيعات والمشاريع العقارية."], en: ["Book a Real Estate CRM Demo | Propics", "Schedule a Propics demo to explore real estate CRM and sales management workflows."] },
  "start-trial": { ar: ["ابدأ تجربة نظام بروبكس العقاري", "اطلب تجربة بروبكس لاكتشاف أدوات إدارة العملاء والمبيعات العقارية لفريقك."], en: ["Start Your Real Estate CRM Trial | Propics", "Request a Propics trial to explore real estate customer and sales management tools."] },
  privacy: { ar: ["سياسة الخصوصية | بروبكس", "اطلع على سياسة الخصوصية الخاصة بمنصة بروبكس."], en: ["Privacy Policy | Propics", "Read the privacy policy for the Propics platform."] },
  terms: { ar: ["الشروط والأحكام | بروبكس", "اطلع على الشروط والأحكام الخاصة باستخدام منصة بروبكس."], en: ["Terms and Conditions | Propics", "Read the terms and conditions for using the Propics platform."] },
  blog: { ar: ["مدونة بروبكس | إدارة المبيعات العقارية", "محتوى بروبكس حول إدارة العملاء والمبيعات العقارية."], en: ["Propics Blog | Real Estate Sales Management", "Insights on real estate CRM, sales management and property workflows."] },
};

export function pageSeo(page: SeoPage, locale: Locale): Metadata {
  const en = `https://propics.sa/${page}`;
  const ar = `https://propics.sa/ar/${page}`;
  const canonical = locale === "ar" ? ar : en;
  const [title, description] = labels[page][locale];
  return {
    title, description,
    alternates: { canonical, languages: { ar, en, "x-default": en } },
    openGraph: { type: "website", siteName: "Propics", title, description, url: canonical, locale: locale === "ar" ? "ar_SA" : "en_US" },
    twitter: { card: "summary_large_image", title, description },
    ...(page === "blog" ? { robots: { index: false, follow: true } } : {}),
  };
}
