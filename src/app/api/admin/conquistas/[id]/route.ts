import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { nome, descricao, categoria, icone, pontos } = body as any;
    const conquista = await prisma.conquista.update({ where: { id: params.id }, data: { nome, descricao, categoria, icone, pontos } });
    return NextResponse.json({ conquista });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao atualizar conquista" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    await prisma.conquista.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao excluir conquista" }, { status: 500 });
  }
}

