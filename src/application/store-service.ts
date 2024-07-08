import { type Store } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'

export class StoreService implements Store {
  constructor (private readonly prisma: PrismaClient) {}

  async createStore (store: Store.CreateStore): Promise<Store.Result | Error> {
    if (store.name !== '') {
      const createdStore = await this.prisma['store'].create({
        data: {
          externalId: store.externalId,
          name: store.name,
          numberOfEmployees: store.numberOfEmployees,
          establishedYear: store.establishedYear,
          locationId: store.locationId,
          ownerId: store.ownerId
        }
      })
      return createdStore
    } else {
      return new Error('Store must have a name!')
    }
  }

  async createStoreWithNames (store: Store.CreateStoreWithNames): Promise<Store.Result | Error> {
    if (store.name !== '') {
      const storeReturned = await this.prisma.store.findFirst({
        where: { externalId: store.externalId }
      })

      if (storeReturned !== null && storeReturned !== undefined) {
        return new Error(`Is there a store with id ${store.externalId}`)
      }

      let location = await this.prisma.location.findFirst({
        where: { name: store.location }
      })

      if (location === null) {
        location = await this.prisma.location.create({
          data: { name: store.location }
        })
      }

      let owner = await this.prisma.owner.findFirst({
        where: { name: store.owner }
      })

      if (owner === null) {
        owner = await this.prisma.owner.create({
          data: { name: store.owner }
        })
      }

      const createdStore = await this.prisma.store.create({
        data: {
          externalId: store.externalId,
          name: store.name,
          numberOfEmployees: store.numberOfEmployees,
          establishedYear: store.establishedYear,
          locationId: location.id,
          ownerId: owner.id
        }
      })
      return createdStore
    } else {
      return new Error('Store must have a name!')
    }
  }

  async updateStoreName (store: { id: number, name: string }): Promise<Store.Result | Error> {
    if (store.id === null || store.id === undefined) {
      return new Error('Store must have id!')
    }

    if (store.name === '') {
      return new Error('Store must have a name!')
    }

    const updatedStore = await this.prisma.store.update({
      where: { id: store.id },
      data: { name: store.name }
    })
    return updatedStore
  }

  async updateStoreEmployers (store: { id: number, numberOfEmployees: number }): Promise<Store.Result | Error> {
    if (store.id === null || store.id === undefined) {
      return new Error('Store must have id!')
    }

    if (store.numberOfEmployees === null) {
      return new Error('Store must have a number of employees!')
    }

    const updatedStore = await this.prisma.store.update({
      where: { id: store.id },
      data: { numberOfEmployees: store.numberOfEmployees }
    })
    return updatedStore
  }

  async updateStoreOwner (store: { id: number, ownerId: number }): Promise<Store.Result | Error> {
    if (store.id === null || store.id === undefined) {
      return new Error('Store must have id!')
    }

    if (store.ownerId === null || store.ownerId === undefined) {
      return new Error('Store must have an owner!')
    }

    const updatedStore = await this.prisma.store.update({
      where: { id: store.id },
      data: { ownerId: store.ownerId }
    })
    return updatedStore
  }

  async updateStoreLocation (store: { id: number, locationId: number }): Promise<Store.Result | Error> {
    if (store.id === null || store.id === undefined) {
      return new Error('Store must have id!')
    }

    if (store.locationId === null || store.locationId === undefined) {
      return new Error('Store must have a location!')
    }

    const updatedStore = await this.prisma.store.update({
      where: { id: store.id },
      data: { locationId: store.locationId }
    })
    return updatedStore
  }

  async updateStoreExternalId (store: { id: number, externalId: number }): Promise<Store.Result | Error> {
    if (store.id === null || store.id === undefined) {
      return new Error('Store must have id!')
    }

    if (store.externalId === null || store.externalId === undefined) {
      return new Error('Store must have an externalId!')
    }

    const updatedStore = await this.prisma.store.update({
      where: { id: store.id },
      data: { externalId: store.externalId }
    })
    return updatedStore
  }

  async getAllStores (): Promise<Store.StoreList> {
    let stores = await this.prisma.store.findMany({
      include: {
        owner: true,
        location: true
      }
    })
    stores = stores.filter(store => !store.disabled)

    return stores.map(store => ({
      id: store.id,
      externalId: store.externalId,
      name: store.name,
      numberOfEmployees: store.numberOfEmployees,
      establishedYear: store.establishedYear,
      locationId: store.locationId,
      ownerId: store.ownerId,
      ownerName: store.owner.name,
      locationName: store.location.name
    }))
  }

  async getStoreById (storeId: Store.StoreId): Promise<Store.Result | null> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId.id },
      include: {
        owner: true,
        location: true
      }
    })

    if (store !== null) {
      return {
        id: store.id,
        externalId: store.externalId,
        name: store.name,
        numberOfEmployees: store.numberOfEmployees,
        establishedYear: store.establishedYear,
        locationId: store.locationId,
        ownerId: store.ownerId,
        ownerName: store.owner.name,
        locationName: store.location.name
      }
    }

    return null
  }

  async getStoresByExternalId (externalId: number): Promise<Store.StoreList> {
    const stores = await this.prisma.store.findMany({
      where: { externalId },
      include: {
        owner: true,
        location: true
      }
    })

    return stores.map(store => ({
      id: store.id,
      externalId: store.externalId,
      name: store.name,
      numberOfEmployees: store.numberOfEmployees,
      establishedYear: store.establishedYear,
      locationId: store.locationId,
      ownerId: store.ownerId,
      ownerName: store.owner.name,
      locationName: store.location.name
    }))
  }

  async getStoresByOwnerId (ownerId: number): Promise<Store.StoreList> {
    const stores = await this.prisma.store.findMany({
      where: { ownerId },
      include: {
        owner: true,
        location: true
      }
    })

    return stores.filter(store => !store.disabled).map(store => ({
      id: store.id,
      externalId: store.externalId,
      name: store.name,
      numberOfEmployees: store.numberOfEmployees,
      establishedYear: store.establishedYear,
      locationId: store.locationId,
      ownerId: store.ownerId,
      ownerName: store.owner.name,
      locationName: store.location.name
    }))
  }

  async getStoresByLocationId (locationId: number): Promise<Store.StoreList> {
    const stores = await this.prisma.store.findMany({
      where: { locationId },
      include: {
        owner: true,
        location: true
      }
    })

    return stores.filter(store => !store.disabled).map(store => ({
      id: store.id,
      externalId: store.externalId,
      name: store.name,
      numberOfEmployees: store.numberOfEmployees,
      establishedYear: store.establishedYear,
      locationId: store.locationId,
      ownerId: store.ownerId,
      ownerName: store.owner.name,
      locationName: store.location.name
    }))
  }

  async deleteStoreById (storeId: Store.StoreId): Promise<{ msg: string }> {
    await this.prisma.store.update({
      where: { id: storeId.id },
      data: { disabled: true }
    })

    return {
      msg: 'Store deleted successfully!'
    }
  }
}
