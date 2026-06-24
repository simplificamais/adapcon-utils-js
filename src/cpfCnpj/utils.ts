const CHAR_CODE_0 = '0'.charCodeAt(0)
const CHAR_CODE_9 = '9'.charCodeAt(0)
const CHAR_CODE_A = 'A'.charCodeAt(0)
const CHAR_CODE_Z = 'Z'.charCodeAt(0)
const LETTER_VALUE_OFFSET = CHAR_CODE_A - 10

const charToValue = (c: string): number => {
  const code = c.charCodeAt(0)
  if (code >= CHAR_CODE_0 && code <= CHAR_CODE_9) return code - CHAR_CODE_0
  if (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) return code - LETTER_VALUE_OFFSET
  return NaN
}

export const calcDigitsPositionsCnpj = (digits: string, positions = 10, sumDigits = 0): string => {
  digits = String(digits)

  for (let i = 0; i < digits.length; i++) {
    sumDigits += (charToValue(digits[i]) * positions)
    positions--
    if (positions < 2) positions = 9
  }

  sumDigits %= 11
  if (sumDigits < 2) sumDigits = 0
  else sumDigits = 11 - sumDigits

  return digits + String(sumDigits)
}

export const calcDigitsPositionsCpf = (digits: string, positions = 10, sumDigits = 0): string => {
  digits = digits.toString()
  let equalDigits = true

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] !== digits[i - 1] && i !== 0) equalDigits = false

    sumDigits += (Number(digits[i]) * positions)
    positions--
  }

  sumDigits %= 11
  if (sumDigits < 2) sumDigits = 0
  else sumDigits = 11 - sumDigits

  if (equalDigits) return '0'

  return digits + String(sumDigits)
}
