import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/infrastructure/express/config/app'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')

describe('Location Routes', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp(prismaMock)
  })

  it('should create a location', async () => {
    const location = { id: 1, name: 'New Location' }
    prismaMock.location.create.mockResolvedValue(location)

    const response = await request(app)
      .post('/locations')
      .send(location)
      .expect(201)

    expect(response.body).toEqual(location)
  })

  it('should update a location name', async () => {
    const location = { id: 1, name: 'Updated Location' }
    prismaMock.location.update.mockResolvedValue({ id: location.id, name: location.name })

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(200)

    expect(response.body).toEqual({ id: location.id, name: location.name })
  })

  it('should return 400 if id is empty in update router', async () => {
    const location = { id: null, name: 'Updated Location' }

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(400)

    expect(response.body).toEqual({ error: 'Location must be have id!' })
  })

  it('should return 400 if name is empty in update router', async () => {
    const location = { id: 1, name: '' }

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(400)

    expect(response.body).toEqual({ error: 'Location must be have name!' })
  })

  it('should get all locations', async () => {
    const locations = [{ id: 1, name: 'Location 1' }, { id: 2, name: 'Location 2' }]
    prismaMock.location.findMany.mockResolvedValue(locations)

    const response = await request(app)
      .get('/locations')
      .expect(200)

    expect(response.body).toEqual(locations)
  })

  it('should get a location by id', async () => {
    const location = { id: 1, name: 'Location 1' }
    prismaMock.location.findUnique.mockResolvedValue(location)

    const response = await request(app)
      .get('/locations/1')
      .expect(200)

    expect(response.body).toEqual(location)
  })

  it('should return 404 if location not found', async () => {
    prismaMock.location.findUnique.mockResolvedValue(null)

    const response = await request(app)
      .get('/locations/999')
      .expect(404)

    expect(response.body).toEqual({ error: 'Location not found' })
  })
})
