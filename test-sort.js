const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  try {
    const potatoes = await prisma.potato.findMany({
      orderBy: [
        { likes: 'desc' },
        { comments: { _count: 'desc' } }
      ],
      take: 5
    })
    console.log('Success:', potatoes.length)
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()
