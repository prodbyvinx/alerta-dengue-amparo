import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    const { latitude, longitude, descricao } = data;

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Latitude e Longitude são obrigatórias.' }, { status: 400 });
    }

    const novaDenuncia = await prisma.denuncia.create({
      data: {
        latitude,
        longitude,
        descricao,
        // fotoUrl: 'url'
      },
    });

    return NextResponse.json(novaDenuncia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar denúncia.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const denuncias = await prisma.denuncia.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(denuncias);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar denúncias.' }, { status: 500 });
  }
}