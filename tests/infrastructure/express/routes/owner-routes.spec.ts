import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/infrastructure/express/config/app'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')

describe('Owner Routes', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp(prismaMock)
  })

  it('should create an owner', async () => {
    const owner = { id: 1, name: 'New Owner' }
    prismaMock.owner.create.mockResolvedValue(owner)

    const response = await request(app)
      .post('/owners')
      .send(owner)
      .expect(201)

    expect(response.body).toEqual(owner)
  })

  it('should return 400 if name is empty ', async () => {
    const owner = { name: '' }

    const response = await request(app)
      .post('/owners')
      .send(owner)
      .expect(400)

    expect(response.body).toEqual({ error: 'Owner must be have name!' })
  })

  it('should update a owner name', async () => {
    const owner = { id: 1, name: 'Updated Owner' }
    prismaMock.owner.update.mockResolvedValue({ id: owner.id, name: owner.name })

    const response = await request(app)
      .put('/owners')
      .send(owner)
      .expect(200)

    expect(response.body).toEqual({ id: owner.id, name: owner.name })
  })

  it('should get all owners', async () => {
    const owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }]
    prismaMock.owner.findMany.mockResolvedValue(owners)

    const response = await request(app)
      .get('/owners')
      .expect(200)

    expect(response.body).toEqual(owners)
  })

  it('should get a owner by id', async () => {
    const owner = { id: 1, name: 'Owner 1' }
    prismaMock.owner.findUnique.mockResolvedValue(owner)

    const response = await request(app)
      .get('/owners/1')
      .expect(200)

    expect(response.body).toEqual(owner)
  })

  it('should return 404 if owner not found', async () => {
    prismaMock.owner.findUnique.mockResolvedValue(null)

    const response = await request(app)
      .get('/owners/999')
      .expect(404)

    expect(response.body).toEqual({ error: 'Owner not found' })
  })
})
