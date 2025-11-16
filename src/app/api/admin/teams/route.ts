import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const equipes = await prisma.equipe.findMany({ orderBy: { nome: "asc" } });
    return NextResponse.json({ equipes });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao listar equipes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { nome, descricao } = body as any;
    const equipe = await prisma.equipe.create({ data: { nome, descricao } });
    return NextResponse.json({ equipe });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao criar equipe" }, { status: 500 });
  }
}

