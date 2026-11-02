import type { MetadataRoute } from "next";

const baseUrl = "https://propics.sa";
const pages = [
  "",
  "/about-us",
  "/features",
  "/why-propics",
  "/contact",
  "/book-demo",
  "/start-trial",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const en = `${baseUrl}${page || "/"}`;
    const ar = `${baseUrl}/ar${page}`;
    const languages = { en, ar, "x-default": en };
    return [
      { url: en, alternates: { languages }, changeFrequency: "monthly" as const, priority: page ? 0.7 : 1 },
      { url: ar, alternates: { languages }, changeFrequency: "monthly" as const, priority: page ? 0.7 : 1 },
    ];
  });
}
