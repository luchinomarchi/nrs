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

    // Cria transporter a partir de URL ou das variáveis discretas
    const emailServer = process.env.EMAIL_SERVER;
    let transporter: nodemailer.Transporter | null = null;
    if (emailServer && emailServer.trim().length > 0) {
      transporter = nodemailer.createTransport(emailServer);
    } else if (process.env.EMAIL_HOST && process.env.EMAIL_PORT && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: Number(process.env.EMAIL_PORT) === 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Evita erro quando SMTP não está configurado; retorna OK para não expor existência do e-mail
      return NextResponse.json({ ok: true, message: "Configuração de e-mail ausente." });
    }

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