import { type LocationService } from '@/application'
import { type LocationResultModel } from '@/domain/models'
import { type HttpErrorResponse, type Location } from '@/domain/usecases'
import { type Request, type Response } from 'express'

export class LocationController {
  constructor (private readonly locationService: LocationService) {

  }

  async createLocation (req: Request, res: Response): Promise<Response< LocationResultModel | HttpErrorResponse >> {
    const location: Location.CreateLocation = req.body

    try {
      const result = await this.locationService.createLocation(location)
      if (result instanceof Error) {
        return res.status(400).json({ error: result.message })
      } else {
        return res.status(201).json(result)
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async updateLocationName (req: Request, res: Response): Promise<Response< Location.Result | HttpErrorResponse >> {
    const location: Location.UpdateLocation = req.body

    try {
      const result = await this.locationService.updateLocationName(location)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getAllLocations (req: Request, res: Response): Promise<Response< Location.LocationList | HttpErrorResponse >> {
    try {
      const locations = await this.locationService.getAllLocations()
      return res.status(200).json(locations)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getLocationById (req: Request, res: Response): Promise<Response< Location.Result | HttpErrorResponse >> {
    const { id } = req.params

    try {
      const location = await this.locationService.getLocationById({ id: parseInt(id, 10) })
      if (location !== null && location !== undefined) {
        return res.status(200).json(location)
      } else {
        return res.status(404).json({ error: 'Location not found' })
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
