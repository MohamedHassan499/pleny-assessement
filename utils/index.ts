export const validYearFounded = (yearFounded: number) => {
  if (typeof yearFounded !== 'number') {
    return false
  }
  const currentYear = new Date().getFullYear()
  return yearFounded >= 1600 && yearFounded <= currentYear
}

export const validName = (brandName: string) => {
  return brandName && brandName.trim().length > 0
}

export const validNumberOfLocations = (numberOfLocations: number) => {
  return numberOfLocations > 0
}
