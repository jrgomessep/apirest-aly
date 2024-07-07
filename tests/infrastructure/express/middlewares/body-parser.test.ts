import { setupApp } from '@/infrastructure/express/config/app'
import { type Express } from 'express'
import request from 'supertest'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp(prismaMock)
  })

  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Usuario' })
      .expect({ name: 'Usuario' })
  })
})
