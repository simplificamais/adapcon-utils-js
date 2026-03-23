import { calculateLambdaCost, DEFAULT_LAMBDA_PRICING } from './lambdaCostCalculator'

describe('calculateLambdaCost', () => {
  describe('correct cost with default pricing', () => {
    it('should calculate cost for a single invocation', () => {
      const durationMs = 1000
      const memorySizeMB = 1024
      const invocations = 1

      const gbSeconds = (durationMs / 1000) * (memorySizeMB / 1024)
      const expected =
        gbSeconds * DEFAULT_LAMBDA_PRICING.pricePerGbSecond * invocations +
        DEFAULT_LAMBDA_PRICING.pricePerRequest * invocations

      expect(calculateLambdaCost(durationMs, memorySizeMB, invocations)).toBe(expected)
    })

    it('should calculate cost for multiple invocations', () => {
      const durationMs = 500
      const memorySizeMB = 512
      const invocations = 1000000

      const gbSeconds = (durationMs / 1000) * (memorySizeMB / 1024)
      const expected =
        gbSeconds * DEFAULT_LAMBDA_PRICING.pricePerGbSecond * invocations +
        DEFAULT_LAMBDA_PRICING.pricePerRequest * invocations

      expect(calculateLambdaCost(durationMs, memorySizeMB, invocations)).toBe(expected)
    })
  })

  describe('correct cost with custom pricing', () => {
    it('should use custom pricing values when provided', () => {
      const customPricing = { pricePerGbSecond: 0.00002, pricePerRequest: 0.0000003 }
      const durationMs = 200
      const memorySizeMB = 256
      const invocations = 100

      const gbSeconds = (durationMs / 1000) * (memorySizeMB / 1024)
      const expected =
        gbSeconds * customPricing.pricePerGbSecond * invocations +
        customPricing.pricePerRequest * invocations

      expect(calculateLambdaCost(durationMs, memorySizeMB, invocations, customPricing)).toBe(expected)
    })

    it('should completely replace defaults with custom pricing', () => {
      const customPricing = { pricePerGbSecond: 0.00001, pricePerRequest: 0.0000001 }
      const result = calculateLambdaCost(1000, 1024, 1, customPricing)
      const resultDefault = calculateLambdaCost(1000, 1024, 1)

      expect(result).not.toBe(resultDefault)
    })
  })

  describe('input validation', () => {
    it('should throw when durationMs is zero', () => {
      expect(() => calculateLambdaCost(0, 512, 1)).toThrow('durationMs must be greater than 0')
    })

    it('should throw when durationMs is negative', () => {
      expect(() => calculateLambdaCost(-100, 512, 1)).toThrow('durationMs must be greater than 0')
    })

    it('should throw when memorySizeMB is zero', () => {
      expect(() => calculateLambdaCost(100, 0, 1)).toThrow('memorySizeMB must be greater than 0')
    })

    it('should throw when memorySizeMB is negative', () => {
      expect(() => calculateLambdaCost(100, -512, 1)).toThrow('memorySizeMB must be greater than 0')
    })

    it('should throw when invocations is zero', () => {
      expect(() => calculateLambdaCost(100, 512, 0)).toThrow('invocations must be greater than 0')
    })

    it('should throw when invocations is negative', () => {
      expect(() => calculateLambdaCost(100, 512, -1)).toThrow('invocations must be greater than 0')
    })

    it('should throw when custom pricePerGbSecond is zero', () => {
      expect(() => calculateLambdaCost(100, 512, 1, { pricePerGbSecond: 0, pricePerRequest: 0.0000002 }))
        .toThrow('pricing.pricePerGbSecond must be greater than 0')
    })

    it('should throw when custom pricePerRequest is zero', () => {
      expect(() => calculateLambdaCost(100, 512, 1, { pricePerGbSecond: 0.0000166667, pricePerRequest: 0 }))
        .toThrow('pricing.pricePerRequest must be greater than 0')
    })

    it('should throw when custom pricePerGbSecond is negative', () => {
      expect(() => calculateLambdaCost(100, 512, 1, { pricePerGbSecond: -1, pricePerRequest: 0.0000002 }))
        .toThrow('pricing.pricePerGbSecond must be greater than 0')
    })
  })
})
