import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const sort = searchParams.get('sort') || 'likes'

    const potatoes = await prisma.potato.findMany({
      orderBy: sort === 'recent' ? { createdAt: 'desc' } : { likes: 'desc' },
      take: 20,
    })
    return NextResponse.json(potatoes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch top' }, { status: 500 })
  }
}
