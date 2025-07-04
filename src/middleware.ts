import { NextResponse, NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { BASE_URL } from './config/env.config';

export async function middleware(request: NextRequest) {
  // check if user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.email) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // stripe subscription
  const stripeSubscriptionUrl = `${BASE_URL}/api/stripe/subscription?email=${token.email}`;

  const stripeSubscription = await fetch(stripeSubscriptionUrl, {
    headers: { Authorization: `Bearer ${token.jwt || token.sub}` },
  });

  const { hasAccess } = await stripeSubscription.json();

  if (!hasAccess) {
    // TODO redirect the user to a new choose pricing plan page (Please select a plan to start using timegrid, etc.)
    return NextResponse.redirect(new URL(`${BASE_URL}/#pricing`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/users'],
};
