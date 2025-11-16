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
    const { nome, descricao } = body as any;
    const equipe = await prisma.equipe.update({ where: { id: params.id }, data: { nome, descricao } });
    return NextResponse.json({ equipe });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao atualizar equipe" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    await prisma.equipe.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao excluir equipe" }, { status: 500 });
  }
}

