import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-mail é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Não revelar se o e-mail existe
      return NextResponse.json({ ok: true });
    }

    // Remover tokens anteriores para este e-mail
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset?token=${token}`;

    const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER || "");
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@nossaronda.org",
      to: email,
      subject: "Redefinição de senha - Nossa Ronda Solidária",
      text: `Olá, recebemos uma solicitação para redefinir sua senha. Acesse: ${resetUrl}`,
      html: `<p>Olá,</p><p>Recebemos uma solicitação para redefinir sua senha.</p><p>Clique no link para continuar: <a href="${resetUrl}">${resetUrl}</a></p><p>Este link expira em 1 hora.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao processar solicitação" }, { status: 500 });
  }
}