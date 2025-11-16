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
    const { nome, descricao, data, horarioInicio, horarioFim, local, endereco, vagasTotal } = body as any;
    const updated = await prisma.evento.update({
      where: { id: params.id },
      data: {
        nome,
        descricao,
        data: data ? new Date(data) : undefined,
        horarioInicio: horarioInicio ? new Date(horarioInicio) : undefined,
        horarioFim: horarioFim ? new Date(horarioFim) : undefined,
        local,
        endereco,
        vagasTotal,
      },
    });
    return NextResponse.json({ evento: updated });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao atualizar evento" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    await prisma.evento.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao excluir evento" }, { status: 500 });
  }
}

