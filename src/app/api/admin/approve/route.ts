import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: { approved: true },
    });

    if (!user?.email) {
      return NextResponse.json({ ok: true, message: "Usuário aprovado, mas sem e-mail para notificação." });
    }

    // Enviar e-mail de aprovação
    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER || "");
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@nossaronda.org",
      to: user.email,
      subject: "Cadastro aprovado - Nossa Ronda Solidária",
      text: `Olá ${user.name ?? ""}, seu cadastro foi aprovado! Você já pode acessar a plataforma.`,
      html: `<p>Olá ${user.name ?? ""},</p><p>Seu cadastro foi <strong>aprovado</strong>! Você já pode acessar a plataforma.</p><p><a href="${process.env.NEXTAUTH_URL || ""}">Entrar</a></p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao aprovar usuário" }, { status: 500 });
  }
}