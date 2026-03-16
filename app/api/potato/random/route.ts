import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const count = await prisma.potato.count()
    console.log('Potato count:', count)
    if (count === 0) {
      return NextResponse.json({ error: 'No potatoes found in DB. Please seed the database.' }, { status: 404 })
    }
    const randomIndex = Math.floor(Math.random() * count)
    const potato = await prisma.potato.findFirst({
      skip: randomIndex,
    })

    return NextResponse.json(potato)
  } catch (error: any) {
    console.error('Failed to fetch random potato:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch' }, { status: 500 })
  }
}
