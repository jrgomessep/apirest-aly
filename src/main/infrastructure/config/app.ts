import express, { type Express } from 'express'
import setupMiddlewares from '@/main/infrastructure/config/middlewares'
import setupRoutes from '@/main/infrastructure/config/routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
