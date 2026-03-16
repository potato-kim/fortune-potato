import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { author, message, password } = await req.json()

    if (!author || !message || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const comment = await prisma.$transaction(async (tx: any) => {
      const newComment = await tx.comment.create({
        data: {
          potatoId: id,
          author,
          message,
          passwordHash,
        },
      })

      await tx.potato.update({
        where: { id },
        data: { commentsCount: { increment: 1 } },
      })

      return newComment
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to comment:', error)
    return NextResponse.json({ error: 'Failed to comment' }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = await prisma.comment.findMany({
      where: { potatoId: id },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
