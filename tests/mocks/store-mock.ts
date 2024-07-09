import { type StoreResultModel } from '@/domain/interfaces'

export const storeMocked = (): StoreMocked => (
  {
    id: 1,
    externalId: 1,
    name: 'Store Name',
    numberOfEmployees: 10,
    establishedYear: 2010,
    locationId: 1,
    ownerId: 1,
    owner: { name: 'Owner 1' },
    location: { name: 'Location 1' },
    ownerName: 'Owner 1',
    locationName: 'Location 1',
    disabled: false
  })

export const storeMockedList = (): StoreMocked[] => [
  {
    id: 1,
    externalId: 1,
    name: 'Store Name 1',
    numberOfEmployees: 10,
    establishedYear: 2010,
    locationId: 1,
    ownerId: 1,
    owner: { name: 'Owner 1' },
    location: { name: 'Location 1' },
    ownerName: 'Owner 1',
    locationName: 'Location 1',
    disabled: false
  },
  {
    id: 2,
    externalId: 2,
    name: 'Store Name 2',
    numberOfEmployees: 10,
    establishedYear: 2010,
    locationId: 2,
    ownerId: 2,
    owner: { name: 'Owner 2' },
    location: { name: 'Location 2' },
    ownerName: 'Owner 2',
    locationName: 'Location 2',
    disabled: false
  }
]

export const storeMockedResult = (store: StoreMocked): StoreMockedResult => ({
  id: store.id,
  externalId: store.externalId,
  name: store.name,
  numberOfEmployees: store.numberOfEmployees,
  establishedYear: store.establishedYear,
  locationId: store.locationId,
  ownerId: store.ownerId,
  ownerName: store.ownerName,
  locationName: store.locationName
})

export interface StoreMockedResult {
  id: number
  externalId: number
  name: string
  numberOfEmployees: number
  establishedYear: number
  locationId: number
  ownerId: number
  ownerName?: string
  locationName?: string
}

export interface StoreMockedResultExtended {
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
  owner?: { id?: number, name: string }
  location?: { id?: number, name: string }
}

interface StoreMocked extends StoreResultModel {
  owner?: { name: string }
  location?: { name: string }
  disabled: boolean
}
