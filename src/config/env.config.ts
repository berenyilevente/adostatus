import { assertEnvVar } from "@/lib/assertions/env";

// AUTH
export const NEXTAUTH_SECRET = assertEnvVar("NEXTAUTH_SECRET", "");
export const NEXTAUTH_URL = assertEnvVar("NEXTAUTH_URL", "");

// RESEND
export const EMAIL_SERVER = assertEnvVar("EMAIL_SERVER", "");
export const RESEND_API_KEY = assertEnvVar("RESEND_API_KEY", "");

// NODE_ENV
export const NODE_ENV = assertEnvVar("NODE_ENV", "development");

// BASE_URL
export const BASE_URL = assertEnvVar("BASE_URL", "");

// DATABASE
export const DATABASE_URL = assertEnvVar("DATABASE_URL", "");
