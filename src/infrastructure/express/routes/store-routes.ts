import { type Router } from 'express'
import { StoreController } from '../controllers'
import { type PrismaClient } from '@prisma/client'
import { StoreService } from '@/application'

export default (router: Router, prisma: PrismaClient): Router => {
  const storeService = new StoreService(prisma)
  const storeController = new StoreController(storeService)

  router.get('/stores', async (req, res) => { await storeController.getAllStores(req, res) })
  router.get('/stores/:id', async (req, res) => { await storeController.getStoreById(req, res) })
  router.get('/stores/external/:externalId', async (req, res) => { await storeController.getStoresByExternalId(req, res) })
  router.get('/stores/owner/:ownerId', async (req, res) => { await storeController.getStoresByOwnerId(req, res) })
  router.get('/stores/location/:locationId', async (req, res) => { await storeController.getStoresByLocationId(req, res) })

  router.post('/stores', async (req, res) => { await storeController.createStore(req, res) })
  router.post('/stores/names', async (req, res) => { await storeController.createStoreWithNames(req, res) })

  router.put('/stores/name', async (req, res) => { await storeController.updateStoreName(req, res) })
  router.put('/stores/employers', async (req, res) => { await storeController.updateStoreEmployers(req, res) })
  router.put('/stores/owner', async (req, res) => { await storeController.updateStoreOwner(req, res) })
  router.put('/stores/location', async (req, res) => { await storeController.updateStoreLocation(req, res) })
  router.put('/stores/externalId', async (req, res) => { await storeController.updateStoreExternalId(req, res) })

  router.delete('/stores/:id', async (req, res) => { await storeController.deleteStoreById(req, res) })

  return router
}
