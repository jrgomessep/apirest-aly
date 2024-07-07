import { type CreateStoreModel, type CreateStoreWithNamesModel, type StoreResultModel } from '@/domain/models'

export interface Store {
  createStore: (store: Store.CreateStore) => Promise<Store.Result | Error>
  createStoreWithNames: (store: Store.CreateStoreWithNames) => Promise<Store.Result | Error>
  updateStoreName: (store: { id: number, name: string }) => Promise<Store.Result | Error>
  updateStoreEmployers: (store: { id: number, numberOfEmployees: number }) => Promise<Store.Result | Error>
  updateStoreOwner: (store: { id: number, ownerId: number }) => Promise<Store.Result | Error>
  updateStoreLocation: (store: { id: number, locationId: number }) => Promise<Store.Result | Error>
  updateStoreExternalId: (store: { id: number, externalId: number }) => Promise<Store.Result | Error>
  getAllStores: () => Promise<Store.StoreList>
  getStoreById: (storeId: Store.StoreId) => Promise<Store.Result | null>
  getStoresByExternalId: (externalId: number) => Promise<Store.StoreList>
  getStoresByOwnerId: (ownerId: number) => Promise<Store.StoreList>
  getStoresByLocationId: (locationId: number) => Promise<Store.StoreList>
  deleteStoreById: (storeId: Store.StoreId) => Promise<{ msg: string }>
}

export namespace Store {
  export type CreateStore = CreateStoreModel

  export type CreateStoreWithNames = CreateStoreWithNamesModel

  export type Result = StoreResultModel

  export type StoreId = {
    id: number
  }

  export type StoreList = Result[]
}
