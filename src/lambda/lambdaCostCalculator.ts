export interface LambdaPricingConfig {
  pricePerGbSecond: number
  pricePerRequest: number
}

export const DEFAULT_LAMBDA_PRICING: LambdaPricingConfig = {
  pricePerGbSecond: 0.0000166667,
  pricePerRequest: 0.0000002
}

export const calculateLambdaCost = (
  durationMs: number,
  memorySizeMB: number,
  invocations: number,
  pricing?: LambdaPricingConfig
): number => {
  if (durationMs <= 0) throw new Error('durationMs must be greater than 0')
  if (memorySizeMB <= 0) throw new Error('memorySizeMB must be greater than 0')
  if (invocations <= 0) throw new Error('invocations must be greater than 0')

  if (pricing != null) {
    if (pricing.pricePerGbSecond <= 0) throw new Error('pricing.pricePerGbSecond must be greater than 0')
    if (pricing.pricePerRequest <= 0) throw new Error('pricing.pricePerRequest must be greater than 0')
  }

  const { pricePerGbSecond, pricePerRequest } = pricing ?? DEFAULT_LAMBDA_PRICING

  const gbSeconds = (durationMs / 1000) * (memorySizeMB / 1024)
  const computeCost = gbSeconds * pricePerGbSecond * invocations
  const requestCost = pricePerRequest * invocations

  return computeCost + requestCost
}
