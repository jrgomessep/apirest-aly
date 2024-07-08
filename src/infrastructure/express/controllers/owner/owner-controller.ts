import { type OwnerService } from '@/application'
import { type OwnerResultModel } from '@/domain/interfaces'
import { type HttpErrorResponse, type Owner } from '@/domain/models'
import { type Request, type Response } from 'express'

export class OwnerController {
  constructor (private readonly ownerService: OwnerService) {

  }

  async createOwner (req: Request, res: Response): Promise<Response< OwnerResultModel | HttpErrorResponse >> {
    const owner: Owner.CreateOwner = req.body

    try {
      const result = await this.ownerService.createOwner(owner)
      if (result instanceof Error) {
        return res.status(400).json({ error: result.message })
      } else {
        return res.status(201).json(result)
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async updateOwnerName (req: Request, res: Response): Promise<Response< Owner.Result | HttpErrorResponse >> {
    const owner: Owner.UpdateOwner = req.body

    try {
      const result = await this.ownerService.updateOwnerName(owner)
      if (result instanceof Error) {
        return res.status(400).json({ error: result.message })
      } else {
        return res.status(200).json(result)
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getAllOwners (req: Request, res: Response): Promise<Response< Owner.OwnerList | HttpErrorResponse >> {
    try {
      const owner = await this.ownerService.getAllOwners()
      return res.status(200).json(owner)
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getOwnerById (req: Request, res: Response): Promise<Response< Owner.Result | HttpErrorResponse >> {
    const { id } = req.params

    try {
      const owner = await this.ownerService.getOwnerById({ id: parseInt(id, 10) })
      if (owner !== null && owner !== undefined) {
        return res.status(200).json(owner)
      } else {
        return res.status(404).json({ error: 'Owner not found' })
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
