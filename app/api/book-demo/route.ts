import { NextRequest, NextResponse } from "next/server";

const required = ["name","email","phone","company","date","time"] as const;

export async function POST(request: NextRequest) {
  const body = await request.json() as Record<string,string>;
  if (required.some((field) => !String(body[field] || "").trim())) return NextResponse.json({message:"Please complete all required fields."},{status:400});
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({message:"Please enter a valid email address."},{status:400});
  const webhook = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!webhook) {
    if (process.env.BOOKING_DEV_MODE === "true") return NextResponse.json({message:"Booking validated in local demo mode. Google email and calendar are not connected yet."});
    return NextResponse.json({message:"Booking service is not connected yet."},{status:503});
  }
  const response = await fetch(webhook,{method:"POST",headers:{"content-type":"text/plain;charset=utf-8"},body:JSON.stringify({...body,source:"propics.sa",timezone:"Asia/Riyadh"}),redirect:"follow"});
  if (!response.ok) return NextResponse.json({message:"We could not confirm the booking. Please try again."},{status:502});
  const result = await response.json().catch(()=>({ok:true})) as {ok?:boolean;message?:string};
  if (result.ok===false) return NextResponse.json({message:result.message||"Booking failed."},{status:502});
  return NextResponse.json({message:"Your demo is booked. A confirmation email has been sent."});
}
