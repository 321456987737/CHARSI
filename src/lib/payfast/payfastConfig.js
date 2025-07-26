export const payfastConfig = {
  merchant_id: process.env.PAYFAST_MERCHANT_ID,
  merchant_key: process.env.PAYFAST_MERCHANT_KEY,
  return_url:process.env.PAYFAST_RETURN_URL,
  cancel_url: process.env.PAYFAST_CANCEL_URL,
  notify_url: process.env.PAYFAST_NOTIFY_URL,
  sandboxUrl: "https://sandbox.payfast.co.za/eng/process"
};
