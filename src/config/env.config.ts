import { assertEnvVar } from "@/lib/assertions/env";

// AUTH
export const NEXTAUTH_SECRET = assertEnvVar("NEXTAUTH_SECRET", "");
export const NEXTAUTH_URL = assertEnvVar("NEXTAUTH_URL", "");

// RESEND
export const EMAIL_SERVER = assertEnvVar("EMAIL_SERVER", "");
export const RESEND_API_KEY = assertEnvVar("RESEND_API_KEY", "");

// MONGODB
export const MONGODB_URI = assertEnvVar("MONGODB_URI", "");

// NODE_ENV
export const NODE_ENV = assertEnvVar("NODE_ENV", "development");

// BASE_URL
export const BASE_URL = assertEnvVar("BASE_URL", "");
