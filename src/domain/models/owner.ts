import { type OwnerResultModel, type CreateOwnerModel, type UpdateOwnerModel } from '@/domain/interfaces'

export interface Owner {
  createOwner: (owner: Owner.CreateOwner) => Promise<Owner.Result | Error>
  updateOwnerName: (owner: Owner.UpdateOwner) => Promise<Owner.Result>
  getAllOwners: () => Promise<Owner.OwnerList>
  getOwnerById: (ownerId: Owner.OwnerId) => Promise<Owner.Result | null>
}

export namespace Owner {
  export type CreateOwner = CreateOwnerModel

  export type UpdateOwner = UpdateOwnerModel

  export type Result = OwnerResultModel | Error

  export type OwnerId = {
    id: number
  }

  export type OwnerList = OwnerResultModel[]
}
