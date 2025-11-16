import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId") || undefined;
    const where = eventId ? { eventoId: eventId } : {};
    const total = await prisma.presenca.count({ where });
    const presentes = await prisma.presenca.count({ where: { ...where, status: "presente" } });
    const ausentes = await prisma.presenca.count({ where: { ...where, status: "ausente" } });
    const justificados = await prisma.presenca.count({ where: { ...where, status: "justificado" } });
    const ultimos = await prisma.presenca.findMany({ where, orderBy: { dataCheckin: "desc" }, take: 50, include: { voluntario: { include: { user: true } }, evento: true } });
    const registros = ultimos.map((p) => ({ id: p.id, voluntario: p.voluntario.user?.name || "", evento: p.evento.nome, status: p.status, pontos: p.pontos, dataCheckin: p.dataCheckin }));
    return NextResponse.json({ resumo: { total, presentes, ausentes, justificados }, registros });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter check-ins" }, { status: 500 });
  }
}

