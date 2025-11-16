import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const conquistas = await prisma.conquista.findMany({ orderBy: { nome: "asc" } });
    return NextResponse.json({ conquistas });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao listar conquistas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { nome, descricao, categoria, icone, pontos } = body as any;
    const conquista = await prisma.conquista.create({ data: { nome, descricao, categoria, icone, pontos } });
    return NextResponse.json({ conquista });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao criar conquista" }, { status: 500 });
  }
}

