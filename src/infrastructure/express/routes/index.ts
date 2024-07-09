import { type Express, Router } from 'express'
import { type PrismaClient } from '@prisma/client'
import locationRoutes from './location-routes'
import ownerRoutes from './owner-routes'
import storeRoutes from './store-routes'

export default (app: Express, prisma: PrismaClient): void => {
  const router = Router()
  app.use('/alyplus', router)
  app.use(locationRoutes(router, prisma))
  app.use(ownerRoutes(router, prisma))
  app.use(storeRoutes(router, prisma))
}
