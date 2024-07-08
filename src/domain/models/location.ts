import { type LocationResultModel, type CreateLocationModel, type UpdateLocationModel } from '@/domain/interfaces'

export interface Location {
  createLocation: (location: Location.CreateLocation) => Promise<Location.Result | Error>
  updateLocationName: (location: Location.UpdateLocation) => Promise<Location.Result>
  getAllLocations: () => Promise<Location.LocationList>
  getLocationById: (locationId: Location.LocationId) => Promise<Location.Result | null>
}

export namespace Location {
  export type CreateLocation = CreateLocationModel

  export type UpdateLocation = UpdateLocationModel

  export type Result = LocationResultModel | Error

  export type LocationId = {
    id: number
  }

  export type LocationList = LocationResultModel[]
}
