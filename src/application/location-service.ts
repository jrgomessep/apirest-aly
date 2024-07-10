import { type Location } from '@/domain/models'
import { MessageBuilder } from '@/shared/utils'
import { type PrismaClient } from '@prisma/client'

export class LocationService extends MessageBuilder implements Location {
  constructor (private readonly prisma: PrismaClient) {
    super('Location')
  }

  async createLocation (location: Location.CreateLocation): Promise<Location.Result | Error> {
    if (location.name !== '') {
      return await this.prisma.location.create({
        data: location
      })
    } else {
      return new Error(this.missingParam('name'))
    }
  }

  async updateLocationName (location: Location.UpdateLocation): Promise<Location.Result> {
    if (location.id === null || location.id === undefined) {
      return new Error(this.missingParam('id'))
    }

    if (location.name === '') {
      return new Error(this.missingParam('name'))
    }

    return await this.prisma.location.update({
      where: { id: location.id },
      data: location
    })
  }

  async getAllLocations (): Promise<Location.LocationList> {
    const location = await this.prisma.location.findMany()

    return location.map(location => ({
      id: location.id,
      name: location.name
    }))
  }

  async getLocationById (locationId: Location.LocationId): Promise<Location.Result | null> {
    const location = await this.prisma.location.findUnique({
      where: { id: locationId.id }
    })

    if (location !== null) {
      return {
        id: location.id,
        name: location.name
      }
    }

    return null
  }
}
