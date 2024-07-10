import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/infrastructure/express/config/app'
import { prismaMock } from '@/mocks/prisma-mock'
import { storeMocked, storeMockedList, storeMockedResult, type StoreMockedResult } from '@/tests/mocks/store-mock'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@prisma/client')

describe('Store Routes', () => {
  let app: Express
  let msgBuilder: MessageBuilder

  beforeAll(async () => {
    app = await setupApp(prismaMock)
    msgBuilder = new MessageBuilder('Store')
  })

  it('should create a store', async () => {
    const store = storeMocked()
    prismaMock.store.create.mockResolvedValue(store)

    const response = await request(app)
      .post('/stores')
      .send(store)
      .expect(HttpStatus.CREATED)

    expect(response.body).toEqual(store)
  })

  it('should return 400 if name is empty when creating a store', async () => {
    const store = storeMocked()
    store.name = ''

    const response = await request(app)
      .post('/stores')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should create a store with names', async () => {
    const store = storeMocked()
    const storeWithNames = {
      externalId: store.externalId,
      name: store.name,
      numberOfEmployees: store.numberOfEmployees,
      establishedYear: store.establishedYear,
      location: store.locationName,
      owner: store.ownerName
    }
    prismaMock.store.findFirst.mockResolvedValue(null)
    prismaMock.location.findFirst.mockResolvedValue({ id: store.locationId, name: String(store.locationName) })
    prismaMock.owner.findFirst.mockResolvedValue({ id: store.ownerId, name: String(store.ownerName) })
    prismaMock.store.create.mockResolvedValue(store)

    const response = await request(app)
      .post('/stores/names')
      .send(storeWithNames)
      .expect(HttpStatus.CREATED)

    expect(response.body).toEqual(store)
  })

  it('should return 400 if name is empty when creating a store with names', async () => {
    const store = storeMocked()
    store.name = ''

    const response = await request(app)
      .post('/stores/names')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should return 400 if exists a store with the same externalId', async () => {
    const store = storeMocked()

    prismaMock.store.findFirst.mockResolvedValue(store)

    const response = await request(app)
      .post('/stores/names')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: `Is there a store with id ${store.externalId}` })
  })

  it('should update a store name', async () => {
    const store = storeMocked()
    store.name = 'Update Store Name'
    prismaMock.store.update.mockResolvedValue(store)

    const response = await request(app)
      .put('/stores/name')
      .send(store)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(store)
  })

  it('should return 400 if id is empty in update store name', async () => {
    const store = { id: null, name: 'Updated Store' }

    const response = await request(app)
      .put('/stores/name')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if name is empty in update store name', async () => {
    const store = { id: 1, name: '' }

    const response = await request(app)
      .put('/stores/name')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should update store employers', async () => {
    const store = { id: 1, numberOfEmployees: 11 }
    const storeMock = storeMocked()
    storeMock.numberOfEmployees = 11
    prismaMock.store.update.mockResolvedValue(storeMock)

    const response = await request(app)
      .put('/stores/employers')
      .send(store)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storeMock)
  })

  it('should return 400 if id is empty in update employers', async () => {
    const store = { id: null, numberOfEmployees: 11 }

    const response = await request(app)
      .put('/stores/employers')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if numberOfEmployees is empty in update employers', async () => {
    const store = { id: 1, numberOfEmployees: null }

    const response = await request(app)
      .put('/stores/employers')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('number of employees') })
  })

  it('should update store owner', async () => {
    const store = { id: 1, ownerId: 20 }
    const storeMock = storeMocked()
    storeMock.ownerId = 20
    // delete storeMock.owner
    // delete storeMock.location

    prismaMock.store.update.mockResolvedValue(storeMock)

    const response = await request(app)
      .put('/stores/owner')
      .send(store)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storeMock)
  })

  it('should return 400 if id is empty in update owner', async () => {
    const store = { id: null, ownerId: 11 }

    const response = await request(app)
      .put('/stores/owner')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if ownerId is empty in update owner', async () => {
    const store = { id: 1, ownerId: null }

    const response = await request(app)
      .put('/stores/owner')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('an owner') })
  })

  it('should update store location', async () => {
    const store = { id: 1, locationId: 30 }
    const storeMock = storeMocked()
    storeMock.locationId = 30
    prismaMock.store.update.mockResolvedValue(storeMock)

    const response = await request(app)
      .put('/stores/location')
      .send(store)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storeMock)
  })

  it('should return 400 if id is empty in update location', async () => {
    const store = { id: null, locationId: 11 }

    const response = await request(app)
      .put('/stores/location')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if locationId is empty in update location', async () => {
    const store = { id: 1, locationId: null }

    const response = await request(app)
      .put('/stores/location')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('location') })
  })

  it('should update store externalId', async () => {
    const store = { id: 1, externalId: 12345 }
    const storeMock = storeMocked()
    storeMock.externalId = 12345
    prismaMock.store.update.mockResolvedValue(storeMock)

    const response = await request(app)
      .put('/stores/externalId')
      .send(store)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storeMock)
  })

  it('should return 400 if id is empty in update external', async () => {
    const store = { id: null, externalId: 11 }

    const response = await request(app)
      .put('/stores/externalId')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if externalId is empty in update external', async () => {
    const store = { id: 1, externalId: null }

    const response = await request(app)
      .put('/stores/externalId')
      .send(store)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('an externalId') })
  })

  it('should get all stores', async () => {
    let stores = storeMockedList()
    stores = stores.map(store => {
      delete store.ownerName
      delete store.locationName
      return store
    })

    prismaMock.store.findMany.mockResolvedValue(stores)
    const storesResult: StoreMockedResult[] = []
    storeMockedList().forEach(store => { storesResult.push(storeMockedResult(store)) })

    const response = await request(app)
      .get('/stores')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storesResult)
  })

  it('should get a store by id', async () => {
    const store = storeMocked()

    prismaMock.store.findUnique.mockResolvedValue(store)

    const response = await request(app)
      .get('/stores/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storeMockedResult(store))
  })

  it('should return 404 if store not found', async () => {
    prismaMock.store.findUnique.mockResolvedValue(null)

    const response = await request(app)
      .get('/stores/999')
      .expect(HttpStatus.NOT_FOUND)

    expect(response.body).toEqual({ error: msgBuilder.notFound() })
  })

  it('should get stores by externalId', async () => {
    const stores = storeMockedList().filter(store => store.externalId === 1)
    prismaMock.store.findMany.mockResolvedValue(stores)

    const storesResult: StoreMockedResult[] = []
    stores.forEach(store => { storesResult.push(storeMockedResult(store)) })

    const response = await request(app)
      .get('/stores/external/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storesResult)
  })

  it('should get stores by ownerId', async () => {
    const stores = storeMockedList().filter(store => store.ownerId === 1)
    prismaMock.store.findMany.mockResolvedValue(stores)

    const storesResult: StoreMockedResult[] = []
    stores.forEach(store => { storesResult.push(storeMockedResult(store)) })

    const response = await request(app)
      .get('/stores/owner/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storesResult)
  })

  it('should get stores by locationId', async () => {
    const stores = storeMockedList().filter(store => store.locationId === 2)
    prismaMock.store.findMany.mockResolvedValue(stores)

    const storesResult: StoreMockedResult[] = []
    stores.forEach(store => { storesResult.push(storeMockedResult(store)) })

    const response = await request(app)
      .get('/stores/location/2')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(storesResult)
  })

  it('should delete a store by id', async () => {
    const response = await request(app)
      .delete('/stores/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual({ msg: 'Store deleted successfully!' })
  })
})
