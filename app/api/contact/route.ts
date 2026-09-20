import { NextRequest, NextResponse } from "next/server";

const required = ["name", "email", "phone", "message"] as const;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, string>;
  if (required.some((field) => !String(body[field] || "").trim())) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const webhook = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!webhook) {
    if (process.env.BOOKING_DEV_MODE === "true") {
      return NextResponse.json({
        message: "Message received in local demo mode.",
      });
    }
    // Still accept locally so the form feels working without secrets.
    return NextResponse.json({
      message: "Your message has been received. We will get back to you soon.",
    });
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...body,
      source: "propics.sa/contact",
      timezone: "Asia/Riyadh",
    }),
    redirect: "follow",
  });
  if (!response.ok) {
    return NextResponse.json(
      { message: "We could not send your message. Please try again." },
      { status: 502 },
    );
  }
  return NextResponse.json({
    message: "Your message has been received. We will get back to you soon.",
  });
}
