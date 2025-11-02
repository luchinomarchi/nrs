import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";

function createTransporter() {
  const serverUrl = process.env.EMAIL_SERVER;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (serverUrl) {
    try {
      return nodemailer.createTransport(serverUrl);
    } catch {
      return null;
    }
  }
  if (host && port && user && pass) {
    try {
      return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    } catch {
      return null;
    }
  }
  return null;
}

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

    // Base URL: prioriza NEXTAUTH_URL; depois VERCEL_URL; senão usa origem da requisição
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
    const originFromReq = new URL(request.url).origin;
    const baseUrl = process.env.NEXTAUTH_URL || vercelUrl || originFromReq;
    const resetUrl = `${baseUrl}/reset?token=${token}`;

    const transporter = createTransporter();
    if (!transporter) {
      // Sem SMTP configurado: evitar falha em produção
      return NextResponse.json({ ok: true, message: "Solicitação registrada. SMTP não configurado." });
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