import express, { type Express } from 'express'
import setupMiddlewares from '@/infrastructure/express/config/middlewares'
import setupRoutes from '@/infrastructure/express/routes'
import { type PrismaClient } from '@prisma/client'

export const setupApp = async (prisma: PrismaClient): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app, prisma)
  return app
}
