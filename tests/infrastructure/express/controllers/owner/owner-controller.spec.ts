import { type Request, type Response } from 'express'
import { type OwnerService } from '@/application/owner-service'
import { OwnerController } from '@/infrastructure/express/controllers'
import { mock, type MockProxy } from 'jest-mock-extended'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@/application/owner-service')

describe('OwnerController', () => {
  let ownerService: MockProxy<OwnerService>
  let ownerController: OwnerController
  let req: Partial<Request>
  let res: Partial<Response>
  let msgBuilder: MessageBuilder

  beforeEach(() => {
    ownerService = mock()
    ownerController = new OwnerController(ownerService)
    req = { body: {}, params: {} }
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    msgBuilder = new MessageBuilder('Owner')
  })

  it('should create a owner', async () => {
    const owner = { name: 'Owner' }
    req.body = owner
    ownerService.createOwner.mockResolvedValue({ id: 1, name: owner.name })

    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: owner.name })
  })

  it('should return 400 if owner does not have name', async () => {
    const owner = { name: '' }
    req.body = owner

    ownerService.createOwner.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to Create owner if there is an error', async () => {
    const owner = { name: 'Owner' }
    req.body = owner

    ownerService.createOwner.mockRejectedValue(null)
    await ownerController.createOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a owner name', async () => {
    const owner = { id: 1, name: 'Updated Owner' }
    req.body = owner
    ownerService.updateOwnerName.mockResolvedValue({ id: owner.id, name: owner.name })

    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ id: owner.id, name: owner.name })
  })

  it('should return 400 if owner does not have id', async () => {
    const owner = { id: null as any, name: 'Updated Owner' }
    req.body = owner

    ownerService.updateOwnerName.mockResolvedValue(new Error(msgBuilder.missingParam('id')))
    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if owner does not have name', async () => {
    const owner = { id: 1 as any, name: '' }
    req.body = owner

    ownerService.updateOwnerName.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to update owner name if there is an error', async () => {
    const owner = { name: 'Update Owner' }
    req.body = owner

    ownerService.updateOwnerName.mockRejectedValue(null)
    await ownerController.updateOwnerName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get all owners', async () => {
    const owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }]
    ownerService.getAllOwners.mockResolvedValue(owners)

    await ownerController.getAllOwners(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(owners)
  })

  it('should return 500 when trying to get all owners if there is an error', async () => {
    ownerService.getAllOwners.mockRejectedValue(null)
    await ownerController.getAllOwners(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a owner by id', async () => {
    const owner = { id: 1, name: 'Owner 1' }
    req.params = { id: '1' }
    ownerService.getOwnerById.mockResolvedValue(owner)

    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(owner)
  })

  it('should return 404 if owner not found', async () => {
    req.params = { id: '999' }
    ownerService.getOwnerById.mockResolvedValue(null)

    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.notFound() })
  })

  it('should return 500 when trying to get owner by id if there is an error', async () => {
    const owner = { id: 1 }
    req.body = owner

    ownerService.getOwnerById.mockRejectedValue(null)
    await ownerController.getOwnerById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })
})
