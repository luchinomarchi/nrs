import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../lib/authOptions"
import { prisma } from "../../../../../lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions as any)
  const role = (session as any)?.role
  if (!session || role !== 'admin') return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  const list = await prisma.setting.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json({ settings: list.map(s => ({ key: s.key, value: s.value, updatedAt: s.updatedAt, updatedBy: s.updatedBy })) })
}

