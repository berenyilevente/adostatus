import prisma from '@/lib/prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const business = await prisma.business.findFirst({
    where: {
      ownerId: userId,
    },
  });

  if (business === null) {
    return NextResponse.json({ business: null }, { status: 404 });
  }

  return NextResponse.json({ business }, { status: 200 });
}
