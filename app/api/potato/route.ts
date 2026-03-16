import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { message, author, password } = await req.json()

    if (!message || !author || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const potato = await prisma.potato.create({
      data: {
        message,
        author,
        passwordHash,
        isDefault: false,
      },
    })

    return NextResponse.json(potato)
  } catch (error) {
    console.error('Failed to create potato:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Basic GET all potatoes (could be used for search/list later)
    const potatoes = await prisma.potato.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return NextResponse.json(potatoes)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
