import { type Request, type Response } from 'express'
import { type LocationService } from '@/application/location-service'
import { LocationController } from '@/infrastructure/express/controllers'
import { mock, type MockProxy } from 'jest-mock-extended'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

jest.mock('@/application/location-service')

describe('LocationController', () => {
  let locationService: MockProxy<LocationService>
  let locationController: LocationController
  let req: Partial<Request>
  let res: Partial<Response>
  let msgBuilder: MessageBuilder

  beforeEach(() => {
    locationService = mock()
    locationController = new LocationController(locationService)
    req = { body: {}, params: {} }
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() }
    msgBuilder = new MessageBuilder('Location')
  })

  it('should create a location', async () => {
    const location = { name: 'New Location' }
    req.body = location
    locationService.createLocation.mockResolvedValue({ id: 1, name: location.name })

    await locationController.createLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: location.name })
  })

  it('should return 400 if location does not have name', async () => {
    const location = { name: '' }
    req.body = location

    locationService.createLocation.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await locationController.createLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to Create location if there is an error', async () => {
    const location = { name: 'Location' }
    req.body = location

    locationService.createLocation.mockRejectedValue(null)
    await locationController.createLocation(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should update a location name', async () => {
    const location = { id: 1, name: 'Updated Location' }
    req.body = location
    locationService.updateLocationName.mockResolvedValue({ id: location.id, name: location.name })

    await locationController.updateLocationName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith({ id: location.id, name: location.name })
  })

  it('should return 400 if location does not have id', async () => {
    const location = { id: null as any, name: 'Updated Location' }
    req.body = location

    locationService.updateLocationName.mockResolvedValue(new Error(msgBuilder.missingParam('id')))
    await locationController.updateLocationName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('id') })
  })

  it('should return 400 if location does not have name', async () => {
    const location = { id: 1 as any, name: '' }
    req.body = location

    locationService.updateLocationName.mockResolvedValue(new Error(msgBuilder.missingParam('name')))
    await locationController.updateLocationName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.missingParam('name') })
  })

  it('should return 500 when trying to update location name if there is an error', async () => {
    const location = { name: 'Update Location' }
    req.body = location

    locationService.updateLocationName.mockRejectedValue(null)
    await locationController.updateLocationName(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get all locations', async () => {
    const locations = [{ id: 1, name: 'Location 1' }, { id: 2, name: 'Location 2' }]
    locationService.getAllLocations.mockResolvedValue(locations)

    await locationController.getAllLocations(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(locations)
  })

  it('should return 500 when trying to get all locations if there is an error', async () => {
    locationService.getAllLocations.mockRejectedValue(null)
    await locationController.getAllLocations(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })

  it('should get a location by id', async () => {
    const location = { id: 1, name: 'Location 1' }
    req.params = { id: '1' }
    locationService.getLocationById.mockResolvedValue(location)

    await locationController.getLocationById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
    expect(res.json).toHaveBeenCalledWith(location)
  })

  it('should return 404 if location not found', async () => {
    req.params = { id: '999' }
    locationService.getLocationById.mockResolvedValue(null)

    await locationController.getLocationById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.notFound() })
  })

  it('should return 500 when trying to get location by id if there is an error', async () => {
    const location = { id: 1 }
    req.body = location

    locationService.getLocationById.mockRejectedValue(null)
    await locationController.getLocationById(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith({ error: msgBuilder.internalServerError() })
  })
})
