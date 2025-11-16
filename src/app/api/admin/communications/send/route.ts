import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";
import nodemailer from "nodemailer";

function createTransporter() {
  const serverUrl = process.env.EMAIL_SERVER;
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (serverUrl) {
    try { return nodemailer.createTransport(serverUrl); } catch { return null; }
  }
  if (host && port && user && pass) {
    try { return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }); } catch { return null; }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { alvo, equipeId, assunto, mensagem } = body as any;
    const transporter = createTransporter();
    if (!transporter) return NextResponse.json({ ok: true, message: "SMTP não configurado" });
    let destinatarios: string[] = [];
    if (alvo === "all") {
      const users = await prisma.user.findMany({ where: { approved: true, email: { not: null } } });
      destinatarios = users.map((u) => u.email!) as string[];
    } else if (alvo === "team" && equipeId) {
      const equipe = await prisma.equipe.findUnique({ where: { id: equipeId }, include: { voluntarios: { include: { user: true } } } });
      destinatarios = (equipe?.voluntarios || []).map((v) => v.user?.email).filter(Boolean) as string[];
    }
    if (destinatarios.length === 0) return NextResponse.json({ ok: true, message: "Sem destinatários" });
    await transporter.sendMail({ from: process.env.EMAIL_FROM || "no-reply@nossaronda.org", bcc: destinatarios, subject: assunto, text: mensagem, html: `<p>${mensagem}</p>` });
    return NextResponse.json({ ok: true, sent: destinatarios.length });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao enviar comunicação" }, { status: 500 });
  }
}

