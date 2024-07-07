import { setupApp } from '@/infrastructure/express/config/app'
import setupMiddlewares from '@/infrastructure/express/config/middlewares'
import setupRoutes from '@/infrastructure/express/routes'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@/infrastructure/express/config/middlewares')
jest.mock('@/infrastructure/express/routes')
jest.mock('@prisma/client')

describe('Test the setupApp', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call setupMiddlewares and setupRoutes', async () => {
    await setupApp(prismaMock)
    expect(setupMiddlewares).toHaveBeenCalled()
    expect(setupRoutes).toHaveBeenCalled()
  })
})
