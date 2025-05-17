import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { BASE_URL } from "./config/env.config";
import { createCheckoutSession } from "./app/actions/stripe/checkout.action";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  const url = `${BASE_URL}/api/stripe/subscription?email=${token.email}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.jwt || token.sub}` },
  });

  const { hasAccess } = await res.json();

  if (!hasAccess) {
    const url = await createCheckoutSession({
      priceId: "price_1RLGGDPpJ1qNQtT5g32E3m5h",
    });

    if (url) {
      return NextResponse.redirect(new URL(url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/users"],
};
