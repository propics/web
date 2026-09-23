import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/notify";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, string>;
  if (!body.name || !body.email || !body.phone) {
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

  const result = await deliverLead(body, "free-trial");
  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status });
  }
  if (result.demo) {
    return NextResponse.json({
      message: "Trial request validated in local demo mode.",
    });
  }
  return NextResponse.json({
    message: "Your free trial request has been sent successfully.",
  });
}
