import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import { prisma } from "../../../../lib/prisma"
import { hashPassword, verifyPassword } from "../../../../lib/auth"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions as any)
  const email = session?.user?.email as string | undefined
  if (!session || !email) return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  const { currentPassword, newPassword } = await request.json()
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
    return NextResponse.json({ error: 'Senha inválida' }, { status: 400 })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  if (user.password) {
    if (!currentPassword || !(await verifyPassword(currentPassword, user.password))) {
      return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
    }
  }
  const hashed = await hashPassword(newPassword)
  await prisma.user.update({ where: { email }, data: { password: hashed } })
  return NextResponse.json({ ok: true })
}

