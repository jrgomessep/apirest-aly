import '../main/infrastructure/config/module-alias'
import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'
import { StoreService } from '@/application'
import prisma from '@/main/infrastructure/prisma'

const filePath = path.resolve('./xlsx/stores.xlsx')

if (!fs.existsSync(filePath)) {
  console.error('Arquivo não encontrado:', filePath)
  process.exit(1)
}

const workbook = XLSX.readFile(filePath)

const sheetNames = workbook.SheetNames

sheetNames.forEach(async sheetName => {
  const worksheet = workbook.Sheets[sheetName]
  const jsonData: Store[] = XLSX.utils.sheet_to_json(worksheet)
  const storeService = new StoreService(prisma)
  for (const store of jsonData) {
    try {
      await storeService.createStoreWithNames({
        externalId: store.StoreID,
        name: store.StoreName,
        numberOfEmployees: store.NumberOfEmployees,
        establishedYear: store.EstablishedYear,
        location: store.Location,
        owner: store.Owner
      })
    } catch (e: any) {
      console.error('asadasd: ', e.message)
    }
  }
  console.log('Importação Concluída')
})

interface Store {
  StoreID: number
  StoreName: string
  Location: string
  Owner: string
  EstablishedYear: number
  NumberOfEmployees: number
}
