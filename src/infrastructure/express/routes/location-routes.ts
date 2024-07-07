import { type Router } from 'express'
import { LocationController } from '../controllers'
import { type PrismaClient } from '@prisma/client'
import { LocationService } from '@/application'

export default (router: Router, prisma: PrismaClient): Router => {
  const locationService = new LocationService(prisma)
  const locationController = new LocationController(locationService)

  router.get('/locations', async (req, res) => { await locationController.getAllLocations(req, res) })
  router.get('/locations/:id', async (req, res) => { await locationController.getLocationById(req, res) })
  router.post('/locations', async (req, res) => { await locationController.createLocation(req, res) })
  router.put('/locations', async (req, res) => { await locationController.updateLocationName(req, res) })

  return router
}
