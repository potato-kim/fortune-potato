import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const likedPotatoes = JSON.parse(cookieStore.get('liked_potatoes')?.value || '[]');

    if (likedPotatoes.includes(id)) {
      return NextResponse.json({ error: 'Already liked in this session' }, { status: 400 });
    }

    const potato = await prisma.potato.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    likedPotatoes.push(id);
    cookieStore.set('liked_potatoes', JSON.stringify(likedPotatoes), {
      httpOnly: true,
      secure: process.env.NODE_SET !== 'production',
      maxAge: 60 * 60 * 24, // 1 day session
      path: '/',
    });

    return NextResponse.json(potato)
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ error: 'Failed to like' }, { status: 500 })
  }
}
