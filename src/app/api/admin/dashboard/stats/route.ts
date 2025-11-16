import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.user ? (session as any).role : (session as any)?.role;
    if (!session || role !== "admin") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const now = new Date();

    const voluntariosAtivos = await prisma.voluntario.count({
      where: { user: { is: { approved: true } } },
    });
    const proximosEventos = await prisma.evento.count({
      where: { data: { gt: now } },
    });
    const checkinsRealizados = await prisma.presenca.count({
      where: { status: "presente" },
    });
    const equipesAtivas = await prisma.equipe.count();

    return NextResponse.json({
      stats: {
        voluntariosAtivos,
        proximosEventos,
        checkinsRealizados,
        equipesAtivas,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter estatísticas" }, { status: 500 });
  }
}
