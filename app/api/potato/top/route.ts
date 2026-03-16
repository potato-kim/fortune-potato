import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const rawSort = searchParams.get('sort') || 'likes'
    
    // Support various sort formats like 'likes', 'recent', 'likes:1', 'recent:1'
    const sort = rawSort.split(':')[0]
    
    console.log(`[Top API] Fetching potatoes sorted by: ${sort} (raw: ${rawSort})`);

    const potatoes = await prisma.potato.findMany({
      orderBy: sort === 'recent' ? { createdAt: 'desc' } : { likes: 'desc' },
      take: 20,
    })
    
    return NextResponse.json(potatoes || [])
  } catch (error) {
    console.error('[Top API Error]:', error)
    // Return empty array instead of 500 object to prevent frontend crash (e.map is not a function)
    return NextResponse.json([], { status: 500 })
  }
}
