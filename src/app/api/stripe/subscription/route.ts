import prisma from "@/lib/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "@/lib/auth/next-auth";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ hasAccess: false }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user?.id,
    },
  });

  console.log("route.ts at Line: 21", subscription);

  if (subscription) {
    return NextResponse.json({ hasAccess: true }, { status: 200 });
  }

  return NextResponse.json({ hasAccess: false }, { status: 403 });
}
