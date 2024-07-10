import { type StoreService } from '@/application'
import { type StoreResultModel } from '@/domain/interfaces'
import { type HttpErrorResponse, type Store } from '@/domain/models'
import { type Request, type Response } from 'express'
import { HttpStatus, MessageBuilder } from '@/shared/utils'

export class StoreController extends MessageBuilder {
  constructor (private readonly storeService: StoreService) {
    super('Store')
  }

  async createStore (req: Request, res: Response): Promise<Response<StoreResultModel | HttpErrorResponse>> {
    const store: Store.CreateStore = req.body

    try {
      const result = await this.storeService.createStore(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.CREATED).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async createStoreWithNames (req: Request, res: Response): Promise<Response<StoreResultModel | HttpErrorResponse>> {
    const store: Store.CreateStoreWithNames = req.body

    try {
      const result = await this.storeService.createStoreWithNames(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.CREATED).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateStoreName (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const store: { id: number, name: string } = req.body

    try {
      const result = await this.storeService.updateStoreName(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateStoreEmployers (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const store: { id: number, numberOfEmployees: number } = req.body

    try {
      const result = await this.storeService.updateStoreEmployers(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateStoreOwner (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const store: { id: number, ownerId: number } = req.body

    try {
      const result = await this.storeService.updateStoreOwner(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateStoreLocation (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const store: { id: number, locationId: number } = req.body

    try {
      const result = await this.storeService.updateStoreLocation(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async updateStoreExternalId (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const store: { id: number, externalId: number } = req.body

    try {
      const result = await this.storeService.updateStoreExternalId(store)
      if (result instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message })
      } else {
        return res.status(HttpStatus.OK).json(result)
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getAllStores (req: Request, res: Response): Promise<Response<Store.StoreList | HttpErrorResponse>> {
    try {
      const stores = await this.storeService.getAllStores()
      return res.status(HttpStatus.OK).json(stores)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getStoreById (req: Request, res: Response): Promise<Response<Store.Result | HttpErrorResponse>> {
    const { id } = req.params

    try {
      const store = await this.storeService.getStoreById({ id: parseInt(id, 10) })
      if (store !== null && store !== undefined) {
        return res.status(HttpStatus.OK).json(store)
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ error: this.notFound() })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getStoresByExternalId (req: Request, res: Response): Promise<Response<Store.StoreList | HttpErrorResponse>> {
    const { externalId } = req.params

    try {
      const stores = await this.storeService.getStoresByExternalId(parseInt(externalId, 10))
      return res.status(HttpStatus.OK).json(stores)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getStoresByOwnerId (req: Request, res: Response): Promise<Response<Store.StoreList | HttpErrorResponse>> {
    const { ownerId } = req.params

    try {
      const stores = await this.storeService.getStoresByOwnerId(parseInt(ownerId, 10))
      return res.status(HttpStatus.OK).json(stores)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async getStoresByLocationId (req: Request, res: Response): Promise<Response<Store.StoreList | HttpErrorResponse>> {
    const { locationId } = req.params

    try {
      const stores = await this.storeService.getStoresByLocationId(parseInt(locationId, 10))
      return res.status(HttpStatus.OK).json(stores)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }

  async deleteStoreById (req: Request, res: Response): Promise<Response<{ msg: string } | HttpErrorResponse>> {
    const { id } = req.params

    try {
      const result = await this.storeService.deleteStoreById({ id: parseInt(id, 10) })
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: this.internalServerError() })
    }
  }
}
