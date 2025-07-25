import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast/signature";
import { payfastConfig } from "@/lib/payfast/payfastConfig";

export async function POST(req) {
  const body = await req.json();
  const { plan, amount } = body;

  const paymentData = {
    merchant_id: payfastConfig.merchant_id,
    merchant_key: payfastConfig.merchant_key,
    return_url: payfastConfig.return_url,
    cancel_url: payfastConfig.cancel_url,
    notify_url: payfastConfig.notify_url,

    m_payment_id: Math.random().toString(36).slice(2), // unique ID
    amount: parseFloat(amount).toFixed(2),
    item_name: plan,
    item_description: `${plan} subscription on Blog`,

    name_first: "Ali",
    name_last: "Akbar",
    email_address: "ifti.hazara205q@gmail.com",

    // RECURRING Billing Setup
    subscription_type: 1,
    billing_date: "2025-07-28",
    recurring_amount: parseFloat(amount).toFixed(2),
    frequency: 3, // 3 = Monthly
    cycles: 0, // 0 = Infinite
    email_confirmation: 1,
    confirmation_address: "ifti.hazara205q@gmail.com",
  };

  const signature = generateSignature(paymentData);
  const formFields = { ...paymentData, signature };
  console.log(signature,"this is the signature ")
  const formHtml = `
    <html>
      <body onload="document.forms[0].submit()">
        <form action="${payfastConfig.sandboxUrl}" method="POST">
          ${Object.entries(formFields)
            .map(([k, v]) => `<input type="hidden" name="${k}" value="${v}" />`)
            .join("\n")}
        </form>
      </body>
    </html>
  `;

  return new NextResponse(formHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
