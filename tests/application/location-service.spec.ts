import { LocationService } from '@/application'
import { prismaMock } from '@/mocks/prisma-mock'
import { MessageBuilder } from '@/shared/utils'

jest.mock('@prisma/client')

describe('LocationService', () => {
  let locationService: LocationService
  let msgBuilder: MessageBuilder

  beforeAll(() => {
    locationService = new LocationService(prismaMock)
    msgBuilder = new MessageBuilder('Location')
  })

  it('should create new location ', async () => {
    const location = {
      id: 1,
      name: 'New York, NY'
    }

    prismaMock.location.create.mockResolvedValue(location)

    await expect(locationService.createLocation(location)).resolves.toEqual({
      id: 1,
      name: 'New York, NY'
    })
  })

  it('should fail if location does not have name', async () => {
    const location = {
      id: 1,
      name: ''
    }

    await expect(locationService.createLocation(location)).resolves.toEqual(
      new Error(msgBuilder.missingParam('name'))
    )
  })

  it('should update a location name ', async () => {
    const location = {
      id: 1,
      name: 'Los Angeles, CA'
    }

    prismaMock.location.update.mockResolvedValue(location)

    await expect(locationService.updateLocationName(location)).resolves.toEqual({
      id: 1,
      name: 'Los Angeles, CA'
    })
  })

  it('should update fail a location doesn\'t have id', async () => {
    const location = {
      id: null as any,
      name: 'Location'
    }

    prismaMock.location.update.mockResolvedValue(location)

    await expect(locationService.updateLocationName(location)).resolves.toEqual(
      new Error(msgBuilder.missingParam('id'))
    )
  })

  it('should update fail a location doesn\'t have name', async () => {
    const location = {
      id: 1,
      name: ''
    }

    prismaMock.location.update.mockResolvedValue(location)

    await expect(locationService.updateLocationName(location)).resolves.toEqual(
      new Error(msgBuilder.missingParam('name'))
    )
  })

  it('should get all locations', async () => {
    const locations = [
      {
        id: 1,
        name: 'Location 1'
      },
      {
        id: 2,
        name: 'Location 2'
      }
    ]

    prismaMock.location.findMany.mockResolvedValue(locations)

    await expect(locationService.getAllLocations()).resolves.toEqual(locations)
  })

  it('should get a location by id', async () => {
    const location = {
      id: 1,
      name: 'Location 1'
    }

    prismaMock.location.findUnique.mockResolvedValue(location)

    await expect(locationService.getLocationById({ id: 1 })).resolves.toEqual(location)
  })
})
