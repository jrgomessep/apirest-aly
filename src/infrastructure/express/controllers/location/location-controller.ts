import { type LocationService } from '@/application'
import { type LocationResultModel } from '@/domain/interfaces'
import { type HttpErrorResponse, type Location } from '@/domain/models'
import { type Request, type Response } from 'express'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

export class LocationController extends MessageBuilder {
  constructor (private readonly locationService: LocationService) {
    super('Location')
  }

  async createLocation (req: Request, res: Response): Promise<Response< LocationResultModel | HttpErrorResponse >> {
    const location: Location.CreateLocation = req.body

    try {
      const result = await this.locationService.createLocation(location)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.CREATED).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateLocationName (req: Request, res: Response): Promise<Response< Location.Result | HttpErrorResponse >> {
    const location: Location.UpdateLocation = req.body

    try {
      const result = await this.locationService.updateLocationName(location)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getAllLocations (req: Request, res: Response): Promise<Response< Location.LocationList | HttpErrorResponse >> {
    try {
      const locations = await this.locationService.getAllLocations()
      return res.status(HttpStatus.OK).json(locations)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getLocationById (req: Request, res: Response): Promise<Response< Location.Result | HttpErrorResponse >> {
    const { id } = req.params

    try {
      const location = await this.locationService.getLocationById({ id: parseInt(id, 10) })
      if (location !== null && location !== undefined) {
        return res.status(HttpStatus.OK).json(location)
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: this.notFound() })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }
}
