import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
      const secure = port === 465;
      return nodemailer.createTransport({
        host,
        port,
        secure,
        requireTLS: !secure,
        auth: { user, pass },
        connectionTimeout: 10000,
      });
    } catch {
      return null;
    }
  }
  return null;
}

export async function GET(request: Request) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return NextResponse.json({ ok: false, error: "SMTP não configurado (EMAIL_SERVER ou EMAIL_HOST/PORT/USER/PASS)" }, { status: 400 });
    }

    // Verifica capacidade de conexão/autenticação sem enviar e-mail
    await transporter.verify();

    const url = new URL(request.url);
    const send = url.searchParams.get("send");
    const to = url.searchParams.get("to");

    if (send === "true" && to) {
      // Opcional: enviar um e-mail de teste
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "no-reply@nossaronda.org",
        to,
        subject: "Teste SMTP - Nossa Ronda Solidária",
        text: "Este é um e-mail de teste para verificar a configuração SMTP.",
      });
      return NextResponse.json({ ok: true, verify: true, sent: true, to });
    }

    return NextResponse.json({ ok: true, verify: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Falha ao verificar SMTP" }, { status: 500 });
  }
}