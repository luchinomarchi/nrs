import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import { prisma } from "../../../../lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any)
    const email = session?.user?.email as string | undefined
    if (!session || !email) return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    const user = await prisma.user.findUnique({ where: { email }, select: { name: true, email: true, image: true, phone: true, bio: true, locale: true, timezone: true, theme: true, notifyEmail: true, notifyPush: true, marketingOptIn: true } })
    return NextResponse.json({ user })
  } catch (e) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions as any)
    const email = session?.user?.email as string | undefined
    if (!session || !email) return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    const body = await request.json()
    const data: any = {}
    if ("image" in body) data.image = body.image || null
    if ("name" in body) data.name = body.name || null
    const user = await prisma.user.update({ where: { email }, data })
    return NextResponse.json({ ok: true, user })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
