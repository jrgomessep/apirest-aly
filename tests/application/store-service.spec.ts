import { StoreService } from '@/application'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')

describe('StoreModel', () => {
  let storeService: StoreService
  beforeAll(() => {
    storeService = new StoreService(prismaMock)
  })
  it('should create a new store', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Test Store',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.create.mockResolvedValue(store)
    await expect(storeService.createStore(store)).resolves.toEqual(store)
  })

  it('should fail if store does not have name', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: '',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.create.mockResolvedValue(store)
    await expect(storeService.createStore(store)).rejects.toEqual(new Error('Store must have a name!'))
  })

  it('should create a new store with names', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Test Store',
      numberOfEmployees: 10,
      establishedYear: 2010,
      disabled: false
    }

    prismaMock.location.findFirst.mockResolvedValue({ id: 1, name: 'Location 1' })
    prismaMock.owner.findFirst.mockResolvedValue({ id: 1, name: 'Rich' })
    prismaMock.store.create.mockResolvedValue({ locationId: 1, ownerId: 1, ...store })
    await expect(storeService.createStoreWithNames({ location: 'Location 1', owner: 'Rich', ...store })).resolves.toEqual({ locationId: 1, ownerId: 1, ...store })
  })

  it('should fail if store does not have name', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: '',
      numberOfEmployees: 10,
      establishedYear: 2010,
      disabled: false
    }

    prismaMock.location.findFirst.mockResolvedValue({ id: 1, name: 'Location 1' })
    prismaMock.owner.findFirst.mockResolvedValue({ id: 1, name: 'Rich' })
    prismaMock.store.create.mockResolvedValue({ locationId: 1, ownerId: 1, ...store })
    await expect(storeService.createStoreWithNames({ location: 'Location 1', owner: 'Rich', ...store })).rejects.toEqual(new Error('Store must have a name!'))
  })

  it('should create a new store with names when don\'t exists in DB ', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Test Store',
      numberOfEmployees: 10,
      establishedYear: 2010,
      disabled: false
    }

    prismaMock.location.findFirst.mockResolvedValue(null)
    prismaMock.owner.findFirst.mockResolvedValue(null)
    prismaMock.location.create.mockResolvedValue({ id: 1, name: 'Location 1' })
    prismaMock.owner.create.mockResolvedValue({ id: 1, name: 'Rich' })
    prismaMock.store.create.mockResolvedValue({ locationId: 1, ownerId: 1, ...store })

    await expect(storeService.createStoreWithNames({ location: 'Location 1', owner: 'Rich', ...store })).resolves.toEqual({ locationId: 1, ownerId: 1, ...store })
    expect(prismaMock.location.create).toHaveBeenCalledTimes(1)
    expect(prismaMock.location.create).toHaveBeenCalledTimes(1)
    expect(prismaMock.owner.create).toHaveBeenCalledTimes(1)
  })

  it('should update a store name', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Updated Store Name',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreName(store)).resolves.toEqual(store)
  })

  it('should fail if store does not have name', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: '',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreName(store)).rejects.toEqual(new Error('Store must have a name!'))
  })

  it('should update a store employers', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Updated Store Name',
      numberOfEmployees: 11,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreEmployers(store)).resolves.toEqual(store)
  })

  it('should update a store owner', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Store Name',
      numberOfEmployees: 11,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 2,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreOwner(store)).resolves.toEqual(store)
  })

  it('should update a store location', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Store Name',
      numberOfEmployees: 11,
      establishedYear: 2010,
      locationId: 2,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreLocation(store)).resolves.toEqual(store)
  })

  it('should update externalId', async () => {
    const store = {
      id: 1,
      externalId: 2,
      name: 'Store Name',
      numberOfEmployees: 11,
      establishedYear: 2010,
      locationId: 2,
      ownerId: 1,
      disabled: false
    }
    prismaMock.store.update.mockResolvedValue(store)
    await expect(storeService.updateStoreExternalId(store)).resolves.toEqual(store)
  })

  it('should get all stores with owner and location names', async () => {
    const stores = [
      {
        id: 1,
        externalId: 1,
        name: 'Store 1',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 1,
        ownerId: 1,
        owner: { id: 1, name: 'Owner 1' },
        location: { id: 1, name: 'Location 1' },
        disabled: false
      },
      {
        id: 2,
        externalId: 2,
        name: 'Store 2',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 2,
        ownerId: 2,
        owner: { id: 2, name: 'Owner 2' },
        location: { id: 2, name: 'Location 2' },
        disabled: false
      }
    ]

    prismaMock.store.findMany.mockResolvedValue(stores)

    await expect(storeService.getAllStores()).resolves.toEqual([
      {
        id: 1,
        externalId: 1,
        name: 'Store 1',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 1,
        ownerId: 1,
        ownerName: 'Owner 1',
        locationName: 'Location 1'
      },
      {
        id: 2,
        externalId: 2,
        name: 'Store 2',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 2,
        ownerId: 2,
        ownerName: 'Owner 2',
        locationName: 'Location 2'
      }
    ])
  })

  it('should get a store by id with owner and location names', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      owner: { name: 'Owner 1' },
      location: { name: 'Location 1' },
      disabled: false
    }

    prismaMock.store.findUnique.mockResolvedValue(store)

    await expect(storeService.getStoreById({ id: 1 })).resolves.toEqual({
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      ownerName: 'Owner 1',
      locationName: 'Location 1'
    })
  })

  it('should get a store by externalId', async () => {
    const store = [{
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      owner: { name: 'Owner 1' },
      location: { name: 'Location 1' },
      disabled: false
    }]

    prismaMock.store.findMany.mockResolvedValue(store)

    await expect(storeService.getStoresByExternalId(1)).resolves.toEqual([
      {
        id: 1,
        externalId: 1,
        name: 'Store 1',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 1,
        ownerId: 1,
        ownerName: 'Owner 1',
        locationName: 'Location 1'
      }
    ])
  })

  it('should get a store by ownerId', async () => {
    const store = [{
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      owner: { name: 'Owner 1' },
      location: { name: 'Location 1' },
      disabled: false
    }]

    prismaMock.store.findMany.mockResolvedValue(store)

    await expect(storeService.getStoresByOwnerId(1)).resolves.toEqual([
      {
        id: 1,
        externalId: 1,
        name: 'Store 1',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 1,
        ownerId: 1,
        ownerName: 'Owner 1',
        locationName: 'Location 1'
      }
    ])
  })

  it('should get a store by locationId', async () => {
    const store = [{
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      locationId: 1,
      ownerId: 1,
      owner: { name: 'Owner 1' },
      location: { name: 'Location 1' },
      disabled: false
    }]

    prismaMock.store.findMany.mockResolvedValue(store)

    await expect(storeService.getStoresByLocationId(1)).resolves.toEqual([
      {
        id: 1,
        externalId: 1,
        name: 'Store 1',
        numberOfEmployees: 10,
        establishedYear: 2010,
        locationId: 1,
        ownerId: 1,
        ownerName: 'Owner 1',
        locationName: 'Location 1'
      }
    ])
  })

  it('should delete a store by id with owner and location names', async () => {
    const store = {
      id: 1,
      externalId: 1,
      name: 'Store 1',
      numberOfEmployees: 10,
      establishedYear: 2010,
      disabled: true,
      locationId: 1,
      ownerId: 1,
      owner: { name: 'Owner 1' },
      location: { name: 'Location 1' }
    }

    prismaMock.store.update.mockResolvedValue(store)

    await expect(storeService.deleteStoreById({ id: 1 })).resolves.toEqual({ msg: 'Store deleted successfully!' })
  })
})
