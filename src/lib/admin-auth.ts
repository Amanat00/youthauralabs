import "server-only";

import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "crypto";

export const ADMIN_SESSION_COOKIE =
  "youthaura_admin_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8;

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

export function verifyAdminCredentials(
  email: string,
  password: string
) {
  const expectedEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";

  const salt =
    process.env.ADMIN_PASSWORD_SALT?.trim() || "";

  const expectedHash =
    process.env.ADMIN_PASSWORD_HASH
      ?.trim()
      .toLowerCase() || "";

  if (!expectedEmail || !salt || !expectedHash) {
    return false;
  }

  const normalizedEmail =
    email.trim().toLowerCase();

  const calculatedHash = scryptSync(
    password,
    salt,
    64
  ).toString("hex");

  return (
    safeEqual(normalizedEmail, expectedEmail) &&
    safeEqual(calculatedHash, expectedHash)
  );
}

export function createAdminSessionToken() {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing."
    );
  }

  const expiresAt =
    Math.floor(Date.now() / 1000) +
    SESSION_TTL_SECONDS;

  const payload = `admin.${expiresAt}`;

  const signature = createHmac(
    "sha256",
    secret
  )
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(
  token?: string | null
) {
  if (!token) return false;

  const secret = getSessionSecret();

  if (!secret) return false;

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  const [role, expiresAtRaw, receivedSignature] =
    parts;

  if (role !== "admin") return false;

  const expiresAt = Number(expiresAtRaw);

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const payload = `${role}.${expiresAtRaw}`;

  const expectedSignature = createHmac(
    "sha256",
    secret
  )
    .update(payload)
    .digest("hex");

  return safeEqual(
    receivedSignature,
    expectedSignature
  );
}

export const adminSessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};