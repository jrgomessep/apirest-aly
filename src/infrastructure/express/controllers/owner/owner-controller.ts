import { type OwnerService } from '@/application'
import { type OwnerResultModel } from '@/domain/interfaces'
import { type HttpErrorResponse, type Owner } from '@/domain/models'
import { type Request, type Response } from 'express'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

export class OwnerController extends MessageBuilder {
  constructor (private readonly ownerService: OwnerService) {
    super('Owner')
  }

  async createOwner (req: Request, res: Response): Promise<Response< OwnerResultModel | HttpErrorResponse >> {
    const owner: Owner.CreateOwner = req.body

    try {
      const result = await this.ownerService.createOwner(owner)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.CREATED).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateOwnerName (req: Request, res: Response): Promise<Response< Owner.Result | HttpErrorResponse >> {
    const owner: Owner.UpdateOwner = req.body

    try {
      const result = await this.ownerService.updateOwnerName(owner)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getAllOwners (req: Request, res: Response): Promise<Response< Owner.OwnerList | HttpErrorResponse >> {
    try {
      const owner = await this.ownerService.getAllOwners()
      return res.status(HttpStatus.OK).json(owner)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getOwnerById (req: Request, res: Response): Promise<Response< Owner.Result | HttpErrorResponse >> {
    const { id } = req.params

    try {
      const owner = await this.ownerService.getOwnerById({ id: parseInt(id, 10) })
      if (owner !== null && owner !== undefined) {
        return res.status(HttpStatus.OK).json(owner)
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: this.notFound() })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }
}
