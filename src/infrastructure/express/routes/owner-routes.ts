import { type Router } from 'express'
import { OwnerController } from '../controllers'
import { type PrismaClient } from '@prisma/client'
import { OwnerService } from '@/application'

export default (router: Router, prisma: PrismaClient): Router => {
  const ownerService = new OwnerService(prisma)
  const ownerController = new OwnerController(ownerService)

  router.get('/owners', async (req, res) => { await ownerController.getAllOwners(req, res) })
  router.get('/owners/:id', async (req, res) => { await ownerController.getOwnerById(req, res) })
  router.post('/owners', async (req, res) => { await ownerController.createOwner(req, res) })
  router.put('/owners', async (req, res) => { await ownerController.updateOwnerName(req, res) })

  return router
}
