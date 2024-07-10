import request from 'supertest'
import { type Express } from 'express'
import { setupApp } from '@/infrastructure/express/config/app'
import { prismaMock } from '@/mocks/prisma-mock'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@prisma/client')

describe('Owner Routes', () => {
  let app: Express
  let msgBuilder: MessageBuilder

  beforeAll(async () => {
    app = await setupApp(prismaMock)
    msgBuilder = new MessageBuilder('Owner')
  })

  it('should create an owner', async () => {
    const owner = { id: 1, name: 'New Owner' }
    prismaMock.owner.create.mockResolvedValue(owner)

    const response = await request(app)
      .post('/owners')
      .send(owner)
      .expect(HttpStatus.CREATED)

    expect(response.body).toEqual(owner)
  })

  it('should return 400 if name is empty ', async () => {
    const owner = { name: '' }

    const response = await request(app)
      .post('/owners')
      .send(owner)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should update a owner name', async () => {
    const owner = { id: 1, name: 'Updated Owner' }
    prismaMock.owner.update.mockResolvedValue({ id: owner.id, name: owner.name })

    const response = await request(app)
      .put('/owners')
      .send(owner)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual({ id: owner.id, name: owner.name })
  })

  it('should return 400 if id is empty in update router', async () => {
    const owner = { id: null, name: 'Updated Owner' }

    const response = await request(app)
      .put('/owners')
      .send(owner)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if name is empty in update router', async () => {
    const owner = { id: 1, name: '' }

    const response = await request(app)
      .put('/owners')
      .send(owner)
      .expect(HttpStatus.BAD_REQUEST)

    expect(response.body).toEqual({ error: msgBuilder.missingParam('name') })
  })

  it('should get all owners', async () => {
    const owners = [{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }]
    prismaMock.owner.findMany.mockResolvedValue(owners)

    const response = await request(app)
      .get('/owners')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(owners)
  })

  it('should get a owner by id', async () => {
    const owner = { id: 1, name: 'Owner 1' }
    prismaMock.owner.findUnique.mockResolvedValue(owner)

    const response = await request(app)
      .get('/owners/1')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(owner)
  })

  it('should return 404 if owner not found', async () => {
    prismaMock.owner.findUnique.mockResolvedValue(null)

    const response = await request(app)
      .get('/owners/999')
      .expect(HttpStatus.NOT_FOUND)

    expect(response.body).toEqual({ error: msgBuilder.notFound() })
  })
})
