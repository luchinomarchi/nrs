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

    const voluntarios = await prisma.voluntario.findMany({
      where: { user: { is: { approved: true } } },
      include: { user: true, equipe: true },
      orderBy: { participacoes: "desc" },
      take: 50,
    });

    const data = voluntarios.map((v) => ({
      id: v.id,
      nome: v.user?.name || "",
      email: v.user?.email || "",
      equipe: v.equipe?.nome || "",
      participacoes: v.participacoes,
      pontos: v.pontos,
      status: v.user?.approved ? "Ativo" : "Pendente",
    }));

    return NextResponse.json({ voluntarios: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter voluntários" }, { status: 500 });
  }
}
