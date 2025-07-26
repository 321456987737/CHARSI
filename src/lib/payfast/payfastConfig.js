export const payfastConfig = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payfast/return`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancelled`,
  notify_url: process.env.PAYFAST_NOTIFY_URL, // Keep this for future production use
  sandboxUrl: "https://sandbox.payfast.co.za/eng/process"
};
