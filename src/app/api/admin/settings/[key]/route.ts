import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { prisma } from "../../../../../lib/prisma";

export async function GET(request: Request, { params }: { params: { key: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const s = await prisma.setting.findUnique({ where: { key: params.key } });
    return NextResponse.json({ key: params.key, value: s?.value ?? null });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao obter configuração" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { key: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role;
    const email = (session as any)?.user?.email || null;
    if (!session || role !== "admin") return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    const { value } = await request.json();
    const s = await prisma.setting.upsert({
      where: { key: params.key },
      update: { value, updatedBy: email || undefined },
      create: { key: params.key, value, updatedBy: email || undefined },
    });
    return NextResponse.json({ key: params.key, value: s.value });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro ao salvar configuração" }, { status: 500 });
  }
}

