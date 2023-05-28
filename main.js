import * as dotenv from 'dotenv'

import log4js from './src/logging/index.js'
import spotConsumer from './src/consumers/spot/index.js'
import statusConsumer from './src/consumers/status/index.js'
import grid6Consumer from './src/consumers/grid6/index.js'

const logger = log4js.getLogger('main')

if (!process.env.CONSUMER_TYPE) {
  logger.error('No consumer type specified')
  process.exit(1)
}

if (!process.env.RABBITMQ_QUEUE) {
  logger.error('No queue specified for consumer')
  process.exit(1)
}

const consumerType = process.env.CONSUMER_TYPE.toLowerCase()

logger.info('Starting up a Consumer of type: %s', consumerType)
dotenv.config()

logger.info('RABBITMQ_HOST: %s', process.env.RABBITMQ_HOST)
logger.info('RABBITMQ_USERNAME: %s', process.env.RABBITMQ_USERNAME)
logger.info('RABBITMQ_PORT: %s', process.env.RABBITMQ_PORT)
logger.info('The consumer is bound to queue: %s', process.env.RABBITMQ_QUEUE)

process.env.RABBITMQ_URL = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`

switch (consumerType) {
  case 'spot':
    spotConsumer()
    break
  case 'status':
    statusConsumer()
    break
  case 'grid6':
    grid6Consumer()
    break
  default:
    logger.error('Invalid consumer type: %s', consumerType)
    break
}
