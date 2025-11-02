import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { hashPassword } from "../../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token é obrigatório" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Senha deve ter pelo menos 6 caracteres" }, { status: 400 });
    }

    const vt = await prisma.verificationToken.findUnique({ where: { token } });
    if (!vt) {
      return NextResponse.json({ error: "Token inválido" }, { status: 400 });
    }
    if (vt.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json({ error: "Token expirado" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: vt.identifier } });
    if (!user) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const hashed = await hashPassword(password);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao redefinir senha" }, { status: 500 });
  }
}