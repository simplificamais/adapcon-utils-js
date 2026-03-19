import { isValidElectronicKey } from '../../src/invoice'

describe('isValidElectronicKey', () => {
  const validElectronicKeys = ['42123454968453231211000025641562232421455852', '42123454968453231211000025641562232421455458']
  const invalidElectronicKeys = ['1234', '123454968453231211000']
  const nonStringInputs = [null, undefined, 12345678901234567890123456789012345678901234]

  test.each(validElectronicKeys)('Should return true if parameter is a electronic key', (param) => {
    expect(isValidElectronicKey(param)).toBe(true)
  })

  test.each(invalidElectronicKeys)('Should return false if parameter is not a electronic key', (param) => {
    expect(isValidElectronicKey(param)).toBe(false)
  })

  test.each(nonStringInputs)('Should return false if parameter is not a string', (param) => {
    expect(isValidElectronicKey(param as unknown as string)).toBe(false)
  })
})
