export const isValidElectronicKey = (electronicKey: string): boolean => {
  if (typeof electronicKey !== 'string') return false
  return electronicKey.length === 44
}
