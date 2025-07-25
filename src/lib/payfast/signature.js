import crypto from "crypto";

export function generateSignature(data, passphrase = "") {
  const keys = Object.keys(data)
    .filter((key) => key !== "signature" && data[key] !== "")
    .sort();

  const queryString = keys
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");

  const fullString = passphrase ? `${queryString}&passphrase=${encodeURIComponent(passphrase)}` : queryString;

  return crypto.createHash("md5").update(fullString).digest("hex");
}
