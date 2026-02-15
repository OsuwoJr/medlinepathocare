import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_SEC = 120; // 2 minutes

function b64UrlEncode(buf: Buffer): string {
  return buf.toString("base64url");
}

function b64UrlDecode(str: string): Buffer {
  return Buffer.from(str, "base64url");
}

export interface OAuthTokenPayload {
  sub: string;
  email: string;
  role: "admin" | "user";
  exp: number;
}

export function createOAuthToken(payload: Omit<OAuthTokenPayload, "exp">): string {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC;
  const data = JSON.stringify({ ...payload, exp });
  const encoded = b64UrlEncode(Buffer.from(data, "utf8"));
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error("NEXTAUTH_SECRET required for OAuth token");
  const sig = createHmac("sha256", secret).update(encoded).digest();
  return `${encoded}.${b64UrlEncode(sig)}`;
}

export function verifyOAuthToken(token: string): OAuthTokenPayload | null {
  try {
    const [encoded, sigB64] = token.split(".");
    if (!encoded || !sigB64) return null;
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) return null;
    const expectedSig = createHmac("sha256", secret).update(encoded).digest();
    const actualSig = b64UrlDecode(sigB64);
    if (expectedSig.length !== actualSig.length || !timingSafeEqual(expectedSig, actualSig)) return null;
    const payload: OAuthTokenPayload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
