import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast/signature";
import User from "@/model/User";
import { connectDB } from "@/lib/blogconnectdb"; // Create a mongoose connection util

export async function POST(req) {
  console.log("POST request received");
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

  console.log("✅ Verified IPN:", data);

  // Now update user in DB
  try {
    await connectDB();

    const userEmail = data.email_address;
    const userPlan = data.item_name;
    const m_payment_id = data.m_payment_id;
    const amount = parseFloat(data.amount);
    const nextBilling = data.billing_date;

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        subscription: {
          plan: userPlan,
          status: "active",
          amount,
          m_payment_id,
          next_billing: new Date(nextBilling),
        },
      },
      { new: true }
    );

    if (!user) {
      console.error("User not found with email:", userEmail);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("🔁 User subscription updated:", user);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}



// // import { NextResponse } from "next/server";
// // import { generateSignature } from "@/lib/payfast/signature";

// // export async function POST(req) {
// //   console.log("POST request received");
// //   const bodyText = await req.text(); // PayFast sends x-www-form-urlencoded
// //   const params = new URLSearchParams(bodyText);
// //   const data = Object.fromEntries(params.entries());

// //   const payfastSignature = data.signature;
// //   const generated = generateSignature(data);

// //   console.log("PayFast Signature:", payfastSignature);
// //   console.log("My Signature:", generated);

// //   if (payfastSignature !== generated) {
// //     console.error("Signature mismatch!");
// //     return NextResponse.json({ error: "Signature mismatch" }, { status: 400 });
// //   }

// //   // Process payment info (save to DB etc.)
// //   console.log("✅ Verified IPN:", data);

// //   return NextResponse.json({ success: true });
// // }
