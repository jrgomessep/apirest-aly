export type CreateStoreModel = {
  externalId: number
  name: string
  numberOfEmployees: number
  establishedYear: number
  locationId: number
  ownerId: number
}

export type CreateStoreWithNamesModel = {
  externalId: number
  name: string
  numberOfEmployees: number
  establishedYear: number
  location: string
  owner: string
}

export type StoreResultModel = {
  id: number
  externalId: number
  name: string
  numberOfEmployees: number
  establishedYear: number
  disabled?: boolean
  locationId: number
  ownerId: number
  ownerName?: string
  locationName?: string
}
