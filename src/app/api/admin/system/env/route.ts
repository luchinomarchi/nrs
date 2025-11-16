import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";

function mask(value?: string | null) {
  if (!value) return null;
  if (value.length <= 6) return "****";
  return value.slice(0, 3) + "***" + value.slice(-3);
}

export async function GET() {
  const session = await getServerSession(authOptions as any);
  const role = (session as any)?.role;
  if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  const env = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || null,
    NEXTAUTH_SECRET: mask(process.env.NEXTAUTH_SECRET),
    DATABASE_URL: mask(process.env.DATABASE_URL),
    EMAIL_SERVER: !!process.env.EMAIL_SERVER,
    EMAIL_HOST: process.env.EMAIL_HOST || null,
    EMAIL_PORT: process.env.EMAIL_PORT || null,
    EMAIL_USER: mask(process.env.EMAIL_USER),
    EMAIL_PASS: mask(process.env.EMAIL_PASS),
    ADMIN_BOOTSTRAP_SECRET: mask(process.env.ADMIN_BOOTSTRAP_SECRET),
  };
  return NextResponse.json({ env });
}

