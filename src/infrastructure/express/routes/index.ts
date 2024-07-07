import { type Express, Router } from 'express'
import locationRoutes from './location-routes'
import { type PrismaClient } from '@prisma/client'

export default (app: Express, prisma: PrismaClient): void => {
  const router = Router()
  app.use('/alyplus', router)
  app.use(locationRoutes(router, prisma))
}
