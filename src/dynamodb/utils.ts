import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { GetDynamoDBClientOptions } from "./dynamodb.types"

export function getDynamoDBClient(options: GetDynamoDBClientOptions = {}) {
  const dynamoInstance = new DynamoDBClient({
    ...(process.env.IS_OFFLINE ? {
      endpoint: options.localEndpoint || 'http://localhost:8000',
      region: 'localhost'
    } : {
      endpoint: options.endpoint || undefined,
      region: options.region || 'sa-east-1'
    }),
  });

  const client = DynamoDBDocument.from(dynamoInstance, {
    marshallOptions: { removeUndefinedValues: true }
  })

  return client
}
