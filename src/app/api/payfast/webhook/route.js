// app/api/payfast/webhook/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/blogconnectdb";
import User from "@/model/User";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Verify PayFast signature here
    
    if (body.payment_status === "COMPLETE") {
      const {
        m_payment_id,
        pf_payment_id,
        amount_gross,
        custom_str1, // You'll need to pass user email here
        item_name // Plan name
      } = body;

      // Calculate subscription end date (1 month from now)
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

      // Update user subscription status
      const updatedUser = await User.findOneAndUpdate(
        { email: custom_str1 },
        {
          $set: {
            subscriptionStatus: item_name.toUpperCase(),
            subscriptionEndDate: subscriptionEndDate
          },
          $push: {
            subscriptionHistory: {
              plan: item_name,
              startDate: new Date(),
              endDate: subscriptionEndDate,
              transactionId: pf_payment_id
            }
          }
        },
        { new: true }
      );

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}