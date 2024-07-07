import express, { type Express } from 'express'
import setupMiddlewares from '@/infrastructure/express/config/middlewares'
import setupRoutes from '@/infrastructure/express/routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
