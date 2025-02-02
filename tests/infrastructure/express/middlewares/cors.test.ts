import { setupApp } from '@/infrastructure/express/config/app'
import { type Express } from 'express'
import request from 'supertest'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')
let app: Express

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = await setupApp(prismaMock)
  })

  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
