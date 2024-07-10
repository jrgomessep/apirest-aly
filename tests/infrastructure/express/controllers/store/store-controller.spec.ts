import { type Request, type Response } from 'express'
import { type StoreService } from '@/application/store-service'
import { StoreController } from '@/infrastructure/express/controllers'
import { mock, type MockProxy } from 'jest-mock-extended'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@/application/store-service')

describe('StoreController', () => {
  let storeService: MockProxy<StoreService>
  let storeController: StoreController
  let req: Partial<Request>
  let res: Partial<Response>
  let msgBuilder: MessageBuilder

  beforeEach(() => {
    storeService = mock()
    storeController = new StoreController(storeService)
    req = { body: {}, params: {} }
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    msgBuilder = new MessageBuilder('Store')
  })

  it('should create a store', async () => {
    const store = { name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, ownerId: 1 }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    storeService.createStore.mockResolvedValue(storeResponse)

    await storeController.createStore(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if store creation fails', async () => {
    const store = { name: '' }
    req.body = store

    storeService.createStore.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await storeController.createStore(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to create a store if there is an error', async () => {
    const store = {}
    req.body = store

    storeService.createStore.mockRejectedValue(null)
    await storeController.createStore(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should create a store with names', async () => {
    const store = { name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, location: 'Location', owner: 'Owner' }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    storeService.createStoreWithNames.mockResolvedValue(storeResponse)

    await storeController.createStoreWithNames(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if store creation with names fails', async () => {
    const store = { name: '' }
    req.body = store

    storeService.createStoreWithNames.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await storeController.createStoreWithNames(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to create a store with names if there is an error', async () => {
    const store = {}
    req.body = store

    storeService.createStoreWithNames.mockRejectedValue(null)
    await storeController.createStoreWithNames(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a store name', async () => {
    const store = { id: 1, name: 'Updated Store' }
    req.body = store
    const storeResponse = { id: 1, name: 'Updated Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    storeService.updateStoreName.mockResolvedValue(storeResponse)

    await storeController.updateStoreName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if update a store name fails', async () => {
    const store = { name: '' }
    req.body = store

    storeService.updateStoreName.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await storeController.updateStoreName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to update store name if there is an error', async () => {
    const store = { name: 'Updated Store' }
    req.body = store

    storeService.updateStoreName.mockRejectedValue(null)
    await storeController.updateStoreName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a store employers', async () => {
    const store = { id: 1, numberOfEmployees: 12 }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 12, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    storeService.updateStoreEmployers.mockResolvedValue(storeResponse)

    await storeController.updateStoreEmployers(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if update a store employers fails', async () => {
    const store = { numberOfEmployees: null }
    req.body = store

    storeService.updateStoreEmployers.mockResolvedValue(new Error(msgBuilder.missingParam('number of employees')))
    await storeController.updateStoreEmployers(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('number of employees') })
  })

  it('should return 500 when trying to update store employers if there is an error', async () => {
    const store = { }
    req.body = store

    storeService.updateStoreEmployers.mockRejectedValue(null)
    await storeController.updateStoreEmployers(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a store owner', async () => {
    const store = { id: 1, ownerId: 2 }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 12, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 2, ownerName: 'Owner 2' }
    storeService.updateStoreOwner.mockResolvedValue(storeResponse)

    await storeController.updateStoreOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if update a store owner fails', async () => {
    const store = { ownerId: null }
    req.body = store

    storeService.updateStoreOwner.mockResolvedValue(new Error(msgBuilder.missingParam('an owner')))
    await storeController.updateStoreOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('an owner') })
  })

  it('should return 500 when trying to update store owner if there is an error', async () => {
    const store = { }
    req.body = store

    storeService.updateStoreOwner.mockRejectedValue(null)
    await storeController.updateStoreOwner(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a store location', async () => {
    const store = { id: 1, locationId: 2 }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 12, establishedYear: 2020, locationId: 2, locationName: 'Location 2', ownerId: 1, ownerName: 'Owner' }
    storeService.updateStoreLocation.mockResolvedValue(storeResponse)

    await storeController.updateStoreLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if update a store owner fails', async () => {
    const store = { locationId: null }
    req.body = store

    storeService.updateStoreLocation.mockResolvedValue(new Error(msgBuilder.missingParam('location')))
    await storeController.updateStoreLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('location') })
  })

  it('should return 500 when trying to update store owner if there is an error', async () => {
    const store = { }
    req.body = store

    storeService.updateStoreLocation.mockRejectedValue(null)
    await storeController.updateStoreLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a store externalId', async () => {
    const store = { id: 1, externalId: 2 }
    req.body = store
    const storeResponse = { id: 1, name: 'Store', externalId: 2, numberOfEmployees: 12, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    storeService.updateStoreExternalId.mockResolvedValue(storeResponse)

    await storeController.updateStoreExternalId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 400 if update a store owner fails', async () => {
    const store = { externalId: null }
    req.body = store

    storeService.updateStoreExternalId.mockResolvedValue(new Error(msgBuilder.missingParam('an externalId')))
    await storeController.updateStoreExternalId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('an externalId') })
  })

  it('should return 500 when trying to update store owner if there is an error', async () => {
    const store = { }
    req.body = store

    storeService.updateStoreExternalId.mockRejectedValue(null)
    await storeController.updateStoreExternalId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get all stores', async () => {
    const storeResponse = [
      {
        id: 1,
        name: 'Store 1',
        externalId: 1,
        numberOfEmployees: 10,
        establishedYear: 2020,
        locationId: 1,
        locationName: 'Location 1',
        ownerId: 1,
        ownerName: 'Owner 1'
      },
      {
        id: 2,
        name: 'Store 2',
        externalId: 2,
        numberOfEmployees: 20,
        establishedYear: 2022,
        locationId: 2,
        locationName: 'Location 2',
        ownerId: 2,
        ownerName: 'Owner 2'
      }
    ]
    storeService.getAllStores.mockResolvedValue(storeResponse)

    await storeController.getAllStores(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(storeResponse)
  })

  it('should return 500 when trying to get all stores if there is an error', async () => {
    storeService.getAllStores.mockRejectedValue(null)
    await storeController.getAllStores(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a store by id', async () => {
    const store = { id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }
    req.params = { id: '1' }
    storeService.getStoreById.mockResolvedValue(store)

    await storeController.getStoreById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(store)
  })

  it('should return 404 if store not found', async () => {
    req.params = { id: '999' }
    storeService.getStoreById.mockResolvedValue(null)

    await storeController.getStoreById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.notFound() })
  })

  it('should return 500 when trying to get store by id if there is an error', async () => {
    req.params = {}

    storeService.getStoreById.mockRejectedValue(null)
    await storeController.getStoreById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a store by externalId', async () => {
    const store = [{ id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }]
    req.params = { id: '1' }
    storeService.getStoresByExternalId.mockResolvedValue(store)

    await storeController.getStoresByExternalId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(store)
  })

  it('should return 500 when trying to get store by externalId if there is an error', async () => {
    req.params = {}

    storeService.getStoresByExternalId.mockRejectedValue(null)
    await storeController.getStoresByExternalId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a store by ownerId', async () => {
    const store = [{ id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }]
    req.params = { id: '1' }
    storeService.getStoresByOwnerId.mockResolvedValue(store)

    await storeController.getStoresByOwnerId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(store)
  })

  it('should return 500 when trying to get store by ownerId if there is an error', async () => {
    req.params = {}

    storeService.getStoresByOwnerId.mockRejectedValue(null)
    await storeController.getStoresByOwnerId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a store by locationId', async () => {
    const store = [{ id: 1, name: 'Store', externalId: 1, numberOfEmployees: 10, establishedYear: 2020, locationId: 1, locationName: 'Location', ownerId: 1, ownerName: 'Owner' }]
    req.params = { id: '1' }
    storeService.getStoresByLocationId.mockResolvedValue(store)

    await storeController.getStoresByLocationId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(store)
  })

  it('should return 500 when trying to get store by locationId if there is an error', async () => {
    req.params = {}

    storeService.getStoresByLocationId.mockRejectedValue(null)
    await storeController.getStoresByLocationId(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should delete a store by id', async () => {
    req.params = { id: '1' }
    storeService.deleteStoreById.mockResolvedValue({ msg: 'Store deleted successfully' })

    await storeController.deleteStoreById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ msg: 'Store deleted successfully' })
  })

  it('should return 500 when trying to delete store by id if there is an error', async () => {
    req.params = { id: '1' }

    storeService.deleteStoreById.mockRejectedValue(null)
    await storeController.deleteStoreById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })
})
