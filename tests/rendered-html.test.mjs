import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { accessSync } from "node:fs";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const PORT = 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const ROUTES = [
  ["/", "ltr", "en"],
  ["/features", "ltr", "en"],
  ["/about-us", "ltr", "en"],
  ["/blog", "ltr", "en"],
  ["/contact", "ltr", "en"],
  ["/start-trial", "ltr", "en"],
  ["/book-demo", "ltr", "en"],
  ["/privacy", "ltr", "en"],
  ["/terms", "ltr", "en"],
  ["/why-propics", "ltr", "en"],
  ["/ar", "rtl", "ar"],
  ["/ar/features", "rtl", "ar"],
  ["/ar/about-us", "rtl", "ar"],
  ["/ar/blog", "rtl", "ar"],
  ["/ar/contact", "rtl", "ar"],
  ["/ar/start-trial", "rtl", "ar"],
  ["/ar/book-demo", "rtl", "ar"],
  ["/ar/privacy", "rtl", "ar"],
  ["/ar/terms", "rtl", "ar"],
  ["/ar/why-propics", "rtl", "ar"],
];

async function waitForServer(url, timeoutMs = 40000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status) return;
    } catch {
      // still booting
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next server did not start at ${url}`);
}

test("Next build output exists", () => {
  accessSync(".next/BUILD_ID");
});

test("serves routes with locale dir and development preview metadata", async (t) => {
  const child = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(PORT), "-H", "127.0.0.1"],
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, BOOKING_DEV_MODE: "true" },
    },
  );
  t.after(() => {
    child.kill("SIGKILL");
  });
  await waitForServer(`${ORIGIN}/`);

  const home = await fetch(`${ORIGIN}/`);
  assert.equal(home.status, 200);
  assert.match(home.headers.get("content-type") ?? "", /^text\/html\b/i);
  const homeHtml = await home.text();
  assert.match(homeHtml, developmentPreviewMeta);

  for (const [path, dir, lang] of ROUTES) {
    const response = await fetch(`${ORIGIN}${path}`);
    assert.equal(response.status, 200, `${path} should return 200`);
    const html = await response.text();
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`), `${path} lang`);
    assert.match(html, new RegExp(`<html[^>]*dir="${dir}"`), `${path} dir`);
  }

  const contact = await fetch(`${ORIGIN}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      phone: "512345678",
      message: "Migration check",
    }),
  });
  assert.equal(contact.status, 200, "contact API in BOOKING_DEV_MODE");
});
