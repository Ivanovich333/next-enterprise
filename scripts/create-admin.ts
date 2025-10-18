import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@smarthome.uz'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Admin'

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name,
    },
  })

  console.log('✅ Admin user created:')
  console.log('Email:', user.email)
  console.log('Password:', password)
  console.log('Name:', user.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
