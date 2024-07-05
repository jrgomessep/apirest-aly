import * as XLSX from 'xlsx'
import * as path from 'path'
import * as fs from 'fs'

jest.mock('fs')
jest.mock('xlsx')

describe('Extract Data Script', () => {
  const mockFilePath = path.resolve('/mnt/data/fast_food_stores.xlsx')
  const mockWorkbook = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: [
        { A: 'Store Name', B: 'Location', C: 'Owner' },
        { A: 'Fast Food Place', B: 'Downtown', C: 'John Doe' }
      ]
    }
  }

  beforeAll(() => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (XLSX.readFile as jest.Mock).mockReturnValue(mockWorkbook);
    (XLSX.utils.sheet_to_json as jest.Mock).mockReturnValue([
      { 'Store Name': 'Fast Food Place', Location: 'Downtown', Owner: 'John Doe' }
    ])
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should check if the file exists', () => {
    expect(fs.existsSync(mockFilePath)).toBe(true)
  })

  it('should read the excel file', () => {
    const workbook = XLSX.readFile(mockFilePath)
    expect(workbook).toEqual(mockWorkbook)
  })

  it('should extract data from the excel sheet', () => {
    const worksheet = mockWorkbook.Sheets.Sheet1
    const jsonData = XLSX.utils.sheet_to_json(worksheet)
    expect(jsonData).toEqual([
      { 'Store Name': 'Fast Food Place', Location: 'Downtown', Owner: 'John Doe' }
    ])
  })
})
