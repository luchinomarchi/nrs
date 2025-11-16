import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    const presencas = await prisma.presenca.findMany({ where: { dataCheckin: { gte: start, lte: end }, status: "presente" }, select: { dataCheckin: true } });
    const map: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      map[formatDate(d)] = 0;
    }
    presencas.forEach(p => {
      const k = formatDate(new Date(p.dataCheckin));
      if (map[k] !== undefined) map[k]++;
    });
    const series = Object.keys(map).map(date => ({ date, count: map[date] }));
    return NextResponse.json({ series });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter engajamento" }, { status: 500 });
  }
}

