import { OwnerService } from '@/application'
import { prismaMock } from '@/mocks/prisma-mock'

jest.mock('@prisma/client')

describe('OwnerService', () => {
  let ownerService: OwnerService
  beforeAll(() => {
    ownerService = new OwnerService(prismaMock)
  })

  it('should create new user ', async () => {
    const owner = {
      id: 1,
      name: 'Rich'
    }

    prismaMock.owner.create.mockResolvedValue(owner)

    await expect(ownerService.createOwner(owner)).resolves.toEqual({
      id: 1,
      name: 'Rich'
    })
  })

  it('should update a owner name ', async () => {
    const owner = {
      id: 1,
      name: 'Rich Haines'
    }

    prismaMock.owner.update.mockResolvedValue(owner)

    await expect(ownerService.updateOwnerName(owner)).resolves.toEqual({
      id: 1,
      name: 'Rich Haines'
    })
  })

  it('should fail if owner does not have name', async () => {
    const owner = {
      id: 1,
      name: ''
    }

    await expect(ownerService.createOwner(owner)).resolves.toEqual(
      new Error('Owner must be have name!')
    )
  })

  it('should get all owners', async () => {
    const owners = [
      {
        id: 1,
        name: 'Owner 1'
      },
      {
        id: 2,
        name: 'Owner 2'
      }
    ]

    prismaMock.owner.findMany.mockResolvedValue(owners)

    await expect(ownerService.getAllOwners()).resolves.toEqual(owners)
  })

  it('should get a owner by id', async () => {
    const owner = {
      id: 1,
      name: 'Owner 1'
    }

    prismaMock.owner.findUnique.mockResolvedValue(owner)

    await expect(ownerService.getOwnerById({ id: 1 })).resolves.toEqual(owner)
  })

  it('shouldn\'t get an owner by ID', async () => {
    prismaMock.owner.findUnique.mockResolvedValue(null)

    await expect(ownerService.getOwnerById({ id: 1 })).resolves.toBeNull()
  })
})
