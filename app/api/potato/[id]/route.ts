import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const potato = await prisma.potato.findUnique({
      where: { id },
    })
    
    if (!potato) {
      return NextResponse.json({ error: 'Potato not found' }, { status: 404 })
    }

    // Fetch comments separately as a workaround for prisma generate issues
    const comments = await prisma.comment.findMany({
      where: { potatoId: id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      ...potato,
      comments: comments.map(c => ({
        ...c,
        author: c.author,
        content: c.message // In schema it's message, in UI it's content
      }))
    })
  } catch (error) {
    console.error('Failed to fetch potato:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
