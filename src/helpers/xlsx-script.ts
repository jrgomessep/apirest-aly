import '../main/infrastructure/config/module-alias'
import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'

const filePath = path.resolve('./xlsx/stores.xlsx')

if (!fs.existsSync(filePath)) {
  console.error('Arquivo não encontrado:', filePath)
  process.exit(1)
}

const workbook = XLSX.readFile(filePath)

const sheetNames = workbook.SheetNames

sheetNames.forEach(async sheetName => {
  const worksheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_json(worksheet)
  console.log(`Dados da planilha "${sheetName}":`, jsonData)
})
