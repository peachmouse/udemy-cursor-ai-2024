import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Actor name is required' },
        { status: 400 }
      );
    }

    const actor = await prisma.actor.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json(actor);
  } catch (error) {
    console.error('Failed to update actor:', error);
    return NextResponse.json(
      { error: 'Failed to update actor' },
      { status: 500 }
    );
  }
}
