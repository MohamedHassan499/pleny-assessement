import mongoose from 'mongoose'
import dotenv from 'dotenv'
import brands from '../data/brands.json'
import { Brand } from '../db/brands-schema'
import { validName, validNumberOfLocations, validYearFounded } from '../utils'
import { BrandType } from '../types'
dotenv.config()

const MIN_YEAR = 1600
const MIN_LOCATIONS = 1

const getNumericValues = (brand: Record<string, any>) => {
  return Object.values(brand)
    .filter((value) => typeof value === 'number')
    .sort((a, b) => +a - +b)
}

;(async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set')
    }
    await mongoose.connect(process.env.DATABASE_URL)
    const fields = ['brandName', 'yearFounded', 'headquarters', 'numberOfLocations']
    const validBrands: BrandType[] = []
    brands.forEach((brand) => {
      const brandAttributes = Object.keys(brand)
      brandAttributes.forEach((key) => {
        if (!fields.includes(key)) {
          //@ts-expect-error
          delete brand[key]
        }
      })
      const numericValues: number[] = getNumericValues(brand)

      // Check if the brand object has the required properties
      if (!brand.brandName || !brand.headquarters) {
        return
      }
      brand.brandName = brand.brandName.toString().trim()
      brand.headquarters = brand.headquarters.toString().trim()
      if (brand.hasOwnProperty('yearFounded') && !validYearFounded(brand.yearFounded as number)) {
        brand.yearFounded = MIN_YEAR
      } else if (!brand.hasOwnProperty('yearFounded')) {
        brand.yearFounded = numericValues[0]
        numericValues.unshift()
      }
      if (brand.hasOwnProperty('numberOfLocations') && !validNumberOfLocations(brand.numberOfLocations as number)) {
        brand.numberOfLocations = MIN_LOCATIONS
      } else if (!brand.hasOwnProperty('numberOfLocations')) {
        brand.numberOfLocations = numericValues[0]
        numericValues.unshift()
      }
      if (
        validYearFounded(brand.yearFounded as number) &&
        validName(brand.brandName as string) &&
        validName(brand.headquarters as string) &&
        validNumberOfLocations(brand.numberOfLocations as number)
      ) {
        validBrands.push(brand as BrandType)
      }
    })
    await Brand.insertMany(validBrands)
    await mongoose.connection.close()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
