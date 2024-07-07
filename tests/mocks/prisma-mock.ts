import { type PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, type DeepMockProxy } from 'jest-mock-extended'
import prisma from '@/infrastructure/persistence/prisma'

jest.mock('@/infrastructure/persistence/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
