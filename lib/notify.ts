export const DEFAULT_NOTIFICATION_EMAIL = "propicsksa@gmail.com";

export type LeadKind = "book-demo" | "free-trial" | "contact";

const SOURCES: Record<LeadKind, string> = {
  "book-demo": "propics.sa",
  "free-trial": "propics.sa-free-trial",
  contact: "propics.sa/contact",
};

/** Inbox for every website / API lead. Override with NOTIFICATION_EMAIL or BOOKING_NOTIFY_EMAIL. */
export function notificationEmail(): string {
  const fromEnv = (
    process.env.NOTIFICATION_EMAIL ||
    process.env.BOOKING_NOTIFY_EMAIL ||
    ""
  ).trim();
  return fromEnv || DEFAULT_NOTIFICATION_EMAIL;
}

export function leadPayload(
  body: Record<string, string>,
  kind: LeadKind,
): Record<string, string> {
  return {
    ...body,
    source: SOURCES[kind],
    timezone: "Asia/Riyadh",
    notifyEmail: notificationEmail(),
  };
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

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify(leadPayload(body, kind)),
    redirect: "follow",
  });
  if (!response.ok) {
    return {
      ok: false,
      status: 502,
      message: "Request could not be sent.",
    };
  }
  const result = (await response.json().catch(() => ({ ok: true }))) as {
    ok?: boolean;
    message?: string;
  };
  if (result.ok === false) {
    return {
      ok: false,
      status: 502,
      message: result.message || "Request failed.",
    };
  }
  return { ok: true };
}
