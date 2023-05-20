import * as dotenv from 'dotenv'

import log4js from './src/logging/index.js'
import spotConsumer from './src/consumers/spot/index.js'
import statusConsumer from './src/consumers/status/index.js'

const logger = log4js.getLogger('main')

if (!process.env.CONSUMER_TYPE) {
  logger.error('No consumer type specified')
  process.exit(1)
}

if (!process.env.RABBITMQ_SPOT_QUEUE) {
  logger.error('No consumer type specified')
  process.exit(1)
}

const consumerType = process.env.CONSUMER_TYPE.toLowerCase()

logger.info('Starting up: %s', consumerType)
dotenv.config()

logger.info('RABBITMQ_HOST: %s', process.env.RABBITMQ_HOST)
logger.info('RABBITMQ_PORT: %s', process.env.RABBITMQ_PORT)
logger.info(
  'Starting a consumer, listening on [%s]',
  process.env.RABBITMQ_SPOT_QUEUE
)

switch (consumerType) {
  case 'spot':
    spotConsumer()
    break
  case 'status':
    statusConsumer()
    break
  default:
    logger.error('Invalid consumer type: %s', consumerType)
    break
}
