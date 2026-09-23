import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/notify";

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

  const result = await deliverLead(body, "contact");
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
  if (result.demo) {
    return NextResponse.json({
      message: "Message received in local demo mode.",
    });
  }
  return NextResponse.json({
    message: "Your message has been received. We will get back to you soon.",
  });
}
