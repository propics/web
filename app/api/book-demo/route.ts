import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/notify";

const required = ["name", "email", "phone", "company", "date", "time"] as const;

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

  const result = await deliverLead(body, "book-demo");
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
  if (result.demo) {
    return NextResponse.json({
      message:
        "Booking validated in local demo mode. Google email and calendar are not connected yet.",
    });
  }
  return NextResponse.json({
    message: "Your demo is booked. A confirmation email has been sent.",
  });
}
