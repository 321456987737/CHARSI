export function generateSignature(params, passphrase = '') {
  const queryString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&') + (passphrase ? `&passphrase=${encodeURIComponent(passphrase)}` : '');

  const crypto = require('crypto');
  return crypto.createHash('md5').update(queryString).digest('hex');
}

export function buildPayfastUrl(params, signature) {
  const query = new URLSearchParams({ ...params, signature }).toString();
  return `https://sandbox.payfast.co.za/eng/process?${query}`;
}