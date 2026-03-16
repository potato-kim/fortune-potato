const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing Prisma connection...')
    const count = await prisma.potato.count()
    console.log('Potato count:', count)
  } catch (error) {
    console.error('Prisma Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
