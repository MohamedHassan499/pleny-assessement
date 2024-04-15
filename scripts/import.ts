import fs from 'fs'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import brands from '../data/brands.json'
import { Brand } from '../db/brands-schema'
dotenv.config()

type BrandType = {
  brandName: string
  yearFounded: number
  headquarters: string
  numberOfLocations: number
}

const MIN_YEAR = 1600
const MIN_LOCATIONS = 1

const validYearFounded = (yearFounded: number) => {
  if (typeof yearFounded !== 'number') {
    return false
  }
  const currentYear = new Date().getFullYear()
  return yearFounded >= 1600 && yearFounded <= currentYear
}

const validName = (brandName: string) => {
  return brandName && brandName.trim().length > 0
}

const validNumberOfLocations = (numberOfLocations: number) => {
  return numberOfLocations > 0
}

;(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    const validBrands: BrandType[] = []
    brands.forEach(async (brand) => {
      if (!brand.brandName || !brand.headquarters) {
        return
      }
      brand.brandName = brand.brandName.toString().trim()
      brand.headquarters = brand.headquarters.toString().trim()
      if (brand.hasOwnProperty('yearFounded') && !validYearFounded(brand.yearFounded as number)) {
        brand.yearFounded = MIN_YEAR
      }
      if (brand.hasOwnProperty('numberOfLocations') && !validNumberOfLocations(brand.numberOfLocations as number)) {
        brand.numberOfLocations = MIN_LOCATIONS
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
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
