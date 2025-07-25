import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast/signature";

export async function POST(req) {
  const bodyText = await req.text(); // PayFast sends x-www-form-urlencoded
  const params = new URLSearchParams(bodyText);
  const data = Object.fromEntries(params.entries());

  const payfastSignature = data.signature;
  const generated = generateSignature(data);

  console.log("PayFast Signature:", payfastSignature);
  console.log("My Signature:", generated);

  if (payfastSignature !== generated) {
    console.error("Signature mismatch!");
    return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
  }

  // Process payment info (save to DB etc.)
  console.log("✅ Verified IPN:", data);

  return NextResponse.json({ success: true });
}
