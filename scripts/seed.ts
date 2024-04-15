import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Brand } from '../db/brands-schema'
dotenv.config()

const MIN_YEAR = 1600
const MIN_LOCATIONS = 1
var currentYear = new Date().getFullYear()

;(async () => {
  mongoose.connect(process.env.DATABASE_URL!)
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
  
})()
