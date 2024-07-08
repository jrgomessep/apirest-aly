import { type Location } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'

export class LocationService implements Location {
  constructor (private readonly prisma: PrismaClient) {}

  async createLocation (location: Location.CreateLocation): Promise<Location.Result | Error> {
    if (location.name !== '') {
      return await this.prisma.location.create({
        data: location
      })
    } else {
      return new Error('Location must be have name!')
    }
  }

  async updateLocationName (location: Location.UpdateLocation): Promise<Location.Result> {
    if (location.id === null || location.id === undefined) {
      return new Error('Location must be have id!')
    }

    if (location.name === '') {
      return new Error('Location must be have name!')
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
