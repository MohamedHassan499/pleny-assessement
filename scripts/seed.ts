import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ExcelJs from 'exceljs'
import { faker } from '@faker-js/faker'
import { Brand } from '../db/brands-schema'
dotenv.config()

const MIN_YEAR = 1600
const MIN_LOCATIONS = 1
var currentYear = new Date().getFullYear()

;(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }
  mongoose.connect(process.env.DATABASE_URL)
  const brands = []
  for (let i = 0; i < 10; i++) {
    const brand = new Brand({
      brandName: faker.company.name(),
      yearFounded: Math.floor(Math.random() * (currentYear - MIN_YEAR + 1)) + MIN_YEAR,
      headquarters: faker.address.city(),
      numberOfLocations: faker.random.numeric(MIN_LOCATIONS + 1),
    })
    brands.push(brand)
  }
  await Brand.insertMany(brands)
  const workbook = new ExcelJs.Workbook()

  // Add a worksheet
  const worksheet = workbook.addWorksheet('Brands')
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 50 },
    { header: 'Brand Name', key: 'brandName', width: 32 },
    { header: 'Year Founded', key: 'yearFounded', width: 15 },
    { header: 'Headquarters', key: 'headquarters', width: 20 },
    { header: 'Number of Locations', key: 'numberOfLocations', width: 20 },
  ]
  worksheet.addRows(brands)
  await workbook.xlsx.writeFile('output/brands.xlsx')
  console.log('Brands exported to Excel')
  await mongoose.connection.close()
})()
