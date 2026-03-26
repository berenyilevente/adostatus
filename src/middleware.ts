import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { BASE_URL } from './config/env.config';

const ACCOUNTANT_ONLY_ROUTES = ['/clients', '/bank-details'];
const CLIENT_ONLY_ROUTES = ['/tax-records'];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.email) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const pathname = request.nextUrl.pathname;
  const role = token.role as string | undefined;

  if (role === 'CLIENT') {
    const isAccountantRoute = ACCOUNTANT_ONLY_ROUTES.some((route) => pathname.startsWith(route));
    if (isAccountantRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (role === 'ACCOUNTANT') {
    const isClientRoute = CLIENT_ONLY_ROUTES.some((route) => pathname.startsWith(route));
    if (isClientRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const stripeSubscriptionUrl = `${BASE_URL}/api/stripe/subscription?email=${token.email}`;
    const stripeSubscription = await fetch(stripeSubscriptionUrl, {
      headers: { Authorization: `Bearer ${token.jwt || token.sub}` },
    });
    const { hasAccess } = await stripeSubscription.json();

    if (!hasAccess) {
      return NextResponse.redirect(new URL(`${BASE_URL}/#pricing`));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/tax-records/:path*', '/clients/:path*', '/bank-details/:path*'],
};
