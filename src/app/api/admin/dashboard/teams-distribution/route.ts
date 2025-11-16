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

    const equipes = await prisma.equipe.findMany({
      include: { voluntarios: { include: { user: true } } },
    });

    const dist = equipes.map((e) => ({
      equipe: e.nome,
      count: e.voluntarios.filter((v) => v.user?.approved).length,
    }));

    return NextResponse.json({ distribuicao: dist });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter distribuição de equipes" }, { status: 500 });
  }
}
