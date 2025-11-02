import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hashPassword } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { email, password, name, secret } = body as any;

    if (!process.env.ADMIN_BOOTSTRAP_SECRET) {
      return NextResponse.json({ error: "ADMIN_BOOTSTRAP_SECRET não configurado" }, { status: 400 });
    }
    if (secret !== process.env.ADMIN_BOOTSTRAP_SECRET) {
      return NextResponse.json({ error: "Segredo inválido" }, { status: 403 });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Senha deve ter pelo menos 6 caracteres" }, { status: 400 });
    }

    // Permitir apenas se ainda não existem usuários
    const usersCount = await prisma.user.count();
    if (usersCount > 0) {
      return NextResponse.json({ error: "Bootstrap indisponível: já existem usuários" }, { status: 403 });
    }

    // Evitar duplicidade por e-mail
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "E-mail já existe" }, { status: 400 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashed,
        role: "admin",
        approved: true,
      },
    });

    await prisma.admin.create({ data: { userId: user.id } });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, role: user.role, approved: user.approved } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao criar admin" }, { status: 500 });
  }
}