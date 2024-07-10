import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/infrastructure/express/config/app'
import { prismaMock } from '@/mocks/prisma-mock'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@prisma/client')

describe('Location Routes', () => {
  let app: Express
  let msgBuilder: MessageBuilder

  beforeAll(async () => {
    app = await setupApp(prismaMock)
    msgBuilder = new MessageBuilder('Location')
  })

  it('should create a location', async () => {
    const location = { id: 1, name: 'New Location' }
    prismaMock.location.create.mockResolvedValue(location)

    const response = await request(app)
      .post('/locations')
      .send(location)
      .expect(HttpStatus.CREATED)

    expect(response.body).toEqual(location)
  })

  it('should update a location name', async () => {
    const location = { id: 1, name: 'Updated Location' }
    prismaMock.location.update.mockResolvedValue({ id: location.id, name: location.name })

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual({ id: location.id, name: location.name })
  })

  it('should return 400 if id is empty in update router', async () => {
    const location = { id: null, name: 'Updated Location' }

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if name is empty in update router', async () => {
    const location = { id: 1, name: '' }

    const response = await request(app)
      .put('/locations')
      .send(location)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should get all locations', async () => {
    const locations = [{ id: 1, name: 'Location 1' }, { id: 2, name: 'Location 2' }]
    prismaMock.location.findMany.mockResolvedValue(locations)

    const response = await request(app)
      .get('/locations')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(locations)
  })

  it('should get a location by id', async () => {
    const location = { id: 1, name: 'Location 1' }
    prismaMock.location.findUnique.mockResolvedValue(location)

    const response = await request(app)
      .get('/locations/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(location)
  })

  it('should return 404 if location not found', async () => {
    prismaMock.location.findUnique.mockResolvedValue(null)

    const response = await request(app)
      .get('/locations/999')
      .expect(HttpStatus.NOT_FOUND)

    expect(response.body).toEqual({ error: msgBuilder.notFound() })
  })
})
