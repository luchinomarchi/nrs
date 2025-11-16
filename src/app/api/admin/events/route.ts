import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const eventos = await prisma.evento.findMany({ orderBy: { data: "asc" } });
    return NextResponse.json({ eventos });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao listar eventos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    const email = (session as any)?.user?.email;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const body = await request.json();
    const { nome, descricao, data, horarioInicio, horarioFim, local, endereco, vagasTotal } = body as any;
    const admin = await prisma.user.findUnique({ where: { email } });
    if (!admin) return NextResponse.json({ error: "Admin não encontrado" }, { status: 404 });
    const created = await prisma.evento.create({
      data: {
        nome,
        descricao,
        data: new Date(data),
        horarioInicio: new Date(horarioInicio),
        horarioFim: new Date(horarioFim),
        local,
        endereco,
        vagasTotal,
        adminId: (await prisma.admin.findUnique({ where: { userId: admin.id } }))?.id || (await prisma.admin.create({ data: { userId: admin.id } })).id,
      },
    });
    return NextResponse.json({ evento: created });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao criar evento" }, { status: 500 });
  }
}

