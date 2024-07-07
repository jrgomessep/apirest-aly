import { setupApp } from '@/main/infrastructure/config/app'
import { type Express } from 'express'
import request from 'supertest'

describe('Test the root path', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  it('should respond with a JSON message', async () => {
    const response = await request(app).get('/alyplus/')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ msg: 'Hello World' })
  })
})
