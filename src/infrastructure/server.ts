import { PrismaClient } from '@prisma/client'
import './config/module-alias'
import { setupApp } from '@/infrastructure/express/config/app'

const createServer = async (): Promise<void> => {
  const prisma = new PrismaClient()
  const app = await setupApp(prisma)
  app.listen(process.env.PORT, () => { console.log(`Server running at http://localhost:${process.env.PORT}`) })
}

createServer()
