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
})
