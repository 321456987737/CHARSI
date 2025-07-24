import { NextResponse } from 'next/server';
import { generateSignature, buildPayfastUrl } from '@/lib/payfast';

export async function POST() {
  const {
    PAYFAST_MERCHANT_ID,
    PAYFAST_MERCHANT_KEY,
    PAYFAST_RETURN_URL,
    PAYFAST_CANCEL_URL,
    PAYFAST_NOTIFY_URL,
  } = process.env;

  const paymentData = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: PAYFAST_RETURN_URL,
    cancel_url: PAYFAST_CANCEL_URL,
    notify_url: PAYFAST_NOTIFY_URL,
    name_first: 'Test',
    name_last: 'User',
    email_address: 'test@example.com',
    m_payment_id: 'INV123',
    amount: '100.00',
    item_name: 'Sample Item',
    item_description: 'A test item',
  };

  try {
    const signature = generateSignature(paymentData, PAYFAST_MERCHANT_KEY);
    const redirectUrl = buildPayfastUrl(paymentData, signature);

    return NextResponse.json({ redirectUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to build PayFast URL' }, { status: 500 });
  }
}