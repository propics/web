export const DEFAULT_NOTIFICATION_EMAIL = "propicsksa@gmail.com";
export const DEMO_DURATION_MINUTES = 30;

export type LeadKind = "book-demo" | "free-trial" | "contact";

const SOURCES: Record<LeadKind, string> = {
  "book-demo": "propics.sa",
  "free-trial": "propics.sa-free-trial",
  contact: "propics.sa/contact",
};

const WEBHOOK_TIMEOUT_MS = 25000;

/** Inbox for every website / API lead. Override with NOTIFICATION_EMAIL or BOOKING_NOTIFY_EMAIL. */
export function notificationEmail(): string {
  const fromEnv = (
    process.env.NOTIFICATION_EMAIL ||
    process.env.BOOKING_NOTIFY_EMAIL ||
    ""
  ).trim();
  return fromEnv || DEFAULT_NOTIFICATION_EMAIL;
}

/** Book Demo slots are labels like "11:00 - 11:30 AM" / "2:00 - 2:30 عصرا". */
export function parseDemoSlot(slot: string): {
  startTime: string;
  endTime: string;
  durationMinutes: number;
} {
  const raw = String(slot || "").trim();
  const isPM = /\bPM\b|مساء|عصرا|ظهرا/i.test(raw);
  const isAM = /\bAM\b|صباح/i.test(raw);
  const mer = isPM ? "PM" : isAM ? "AM" : "";
  const matches = [...raw.matchAll(/(\d{1,2}):(\d{2})/g)];

  const to24 = (hour: number, minute: number) => {
    let h = hour;
    if (mer === "PM" && h < 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  if (matches.length >= 1) {
    const startTime = to24(Number(matches[0][1]), Number(matches[0][2]));
    const endTime =
      matches.length >= 2
        ? to24(Number(matches[1][1]), Number(matches[1][2]))
        : addMinutes(startTime, DEMO_DURATION_MINUTES);
    return { startTime, endTime, durationMinutes: DEMO_DURATION_MINUTES };
  }

  return {
    startTime: "10:00",
    endTime: "10:30",
    durationMinutes: DEMO_DURATION_MINUTES,
  };
}

function addMinutes(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}

export function leadPayload(
  body: Record<string, string>,
  kind: LeadKind,
): Record<string, string> {
  const payload: Record<string, string> = {
    ...body,
    source: SOURCES[kind],
    timezone: "Asia/Riyadh",
    notifyEmail: notificationEmail(),
  };
  if (kind === "book-demo") {
    const slot = parseDemoSlot(body.time || body.slot || "");
    payload.startTime = slot.startTime;
    payload.endTime = slot.endTime;
    payload.durationMinutes = String(slot.durationMinutes);
    payload.slot = body.time || body.slot || "";
  }
  return payload;
}

function webhookSucceeded(status: number, type?: string): boolean {
  if (status >= 200 && status < 300) return true;
  if (status >= 301 && status <= 308) return true;
  // redirect: 'manual' can surface as an opaque 0 in some runtimes.
  if (status === 0 && type === "opaqueredirect") return true;
  return false;
}

export async function deliverLead(
  body: Record<string, string>,
  kind: LeadKind,
): Promise<
  | { ok: true; demo?: boolean }
  | { ok: false; status: number; message: string }
> {
  const webhook = (process.env.GOOGLE_APPS_SCRIPT_URL || "").trim();
  if (!webhook) {
    if (process.env.BOOKING_DEV_MODE === "true") {
      return { ok: true, demo: true };
    }
    return {
      ok: false,
      status: 503,
      message:
        "Email service is not connected yet. Set GOOGLE_APPS_SCRIPT_URL (notifications go to propicsksa@gmail.com).",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    // Apps Script always 302s to script.googleusercontent.com after doPost.
    // Following that hop often fails (blocked / 405) even though the script
    // already created the event and sent mail — that was the false UI error.
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify(leadPayload(body, kind)),
      redirect: "manual",
      signal: controller.signal,
    });

    if (!webhookSucceeded(response.status, response.type)) {
      return {
        ok: false,
        status: 502,
        message: "Request could not be sent.",
      };
    }

    const text = await response.text().catch(() => "");
    if (!text || /<!doctype html|<html/i.test(text)) {
      return { ok: true };
    }
    try {
      const result = JSON.parse(text) as { ok?: boolean; message?: string };
      if (result.ok === false) {
        return {
          ok: false,
          status: 502,
          message: result.message || "Request failed.",
        };
      }
    } catch {
      // Non-JSON success body from GAS / redirect.
    }
    return { ok: true };
  } catch (error) {
    const aborted =
      (error instanceof Error && error.name === "AbortError") ||
      /aborted|timeout/i.test(String(error));
    // Cold GAS + calendar + two mails can exceed the client wait; the
    // webhook usually still finishes. Do not show a false send failure.
    if (aborted) return { ok: true };
    return {
      ok: false,
      status: 502,
      message: "Request could not be sent.",
    };
  } finally {
    clearTimeout(timer);
  }
}
