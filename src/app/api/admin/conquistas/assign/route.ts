import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { voluntarioId, conquistaId, progresso = 0, desbloqueada = false } = body as any;
    const cv = await prisma.conquistaVoluntario.upsert({
      where: { voluntarioId_conquistaId: { voluntarioId, conquistaId } },
      update: { progresso, desbloqueada, dataConquista: desbloqueada ? new Date() : null },
      create: { voluntarioId, conquistaId, progresso, desbloqueada, dataConquista: desbloqueada ? new Date() : null },
    });
    return NextResponse.json({ conquistaVoluntario: cv });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao atribuir conquista" }, { status: 500 });
  }
}

