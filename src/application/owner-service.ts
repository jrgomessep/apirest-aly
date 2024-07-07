import { type Owner } from '@/domain/usecases'
import { type PrismaClient } from '@prisma/client'

export class OwnerService implements Owner {
  constructor (private readonly prisma: PrismaClient) {}

  async createOwner (owner: Owner.CreateOwner): Promise<Owner.Result | Error> {
    if (owner.name !== '') {
      return await this.prisma.owner.create({
        data: owner
      })
    } else {
      return new Error('Owner must be have name!')
    }
  }

  async updateOwnerName (owner: Owner.UpdateOwner): Promise<Owner.Result> {
    return await this.prisma.owner.update({
      where: { id: owner.id },
      data: owner
    })
  }

  async getAllOwners (): Promise<Owner.OwnerList> {
    const owners = await this.prisma.owner.findMany()

    return owners.map(owner => ({
      id: owner.id,
      name: owner.name
    }))
  }

  async getOwnerById (ownerId: Owner.OwnerId): Promise<Owner.Result | null> {
    const owner = await this.prisma.owner.findUnique({
      where: { id: ownerId.id }
    })

    if (owner !== null) {
      return {
        id: owner.id,
        name: owner.name
      }
    }

    return null
  }
}
