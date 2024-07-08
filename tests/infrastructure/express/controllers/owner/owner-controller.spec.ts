import { type Request, type Response } from 'express'
import { type OwnerService } from '@/application/owner-service'
import { OwnerController } from '@/infrastructure/express/controllers'
import { mock, type MockProxy } from 'jest-mock-extended'

jest.mock('@/application/owner-service')

describe('OwnerController', () => {
  let ownerService: MockProxy<OwnerService>
  let ownerController: OwnerController
  let req: Partial<Request>
  let res: Partial<Response>

  beforeEach(() => {
    ownerService = mock()
    ownerController = new OwnerController(ownerService)
    req = { body: {}, params: {} }
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
  })

  it('should create a owner', async () => {
    const owner = { name: 'Owner' }
    req.body = owner
    ownerService.createOwner.mockResolvedValue({ id: 1, name: owner.name })

    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: owner.name })
  })

  it('should return 400 if owner does not have name', async () => {
    const owner = { name: '' }
    req.body = owner

    ownerService.createOwner.mockResolvedValue(new Error('Owner must be have name!'))
    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Owner must be have name!' })
  })

  it('should return 500 when trying to Create owner if there is an error', async () => {
    const owner = { name: 'Owner' }
    req.body = owner

    ownerService.createOwner.mockRejectedValue(null)
    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })

  it('should update a owner name', async () => {
    const owner = { id: 1, name: 'Updated Owner' }
    req.body = owner
    ownerService.updateOwnerName.mockResolvedValue({ id: owner.id, name: owner.name })

    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: owner.id, name: owner.name })
  })

  it('should return 500 when trying to update owner name if there is an error', async () => {
    const owner = { name: 'Update Owner' }
    req.body = owner

    ownerService.updateOwnerName.mockRejectedValue(null)
    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })

  it('should get all owners', async () => {
    const owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }]
    ownerService.getAllOwners.mockResolvedValue(owners)

    await ownerController.getAllOwners(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(owners)
  })

  it('should return 500 when trying to get all owners if there is an error', async () => {
    ownerService.getAllOwners.mockRejectedValue(null)
    await ownerController.getAllOwners(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })

  it('should get a owner by id', async () => {
    const owner = { id: 1, name: 'Owner 1' }
    req.params = { id: '1' }
    ownerService.getOwnerById.mockResolvedValue(owner)

    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(owner)
  })

  it('should return 404 if owner not found', async () => {
    req.params = { id: '999' }
    ownerService.getOwnerById.mockResolvedValue(null)

    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Owner not found' })
  })

  it('should return 500 when trying to get owner by id if there is an error', async () => {
    const owner = { id: 1 }
    req.body = owner

    ownerService.getOwnerById.mockRejectedValue(null)
    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})
