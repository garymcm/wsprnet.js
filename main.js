import * as dotenv from 'dotenv'
import { Command } from 'commander'

import log4js from './src/logging/index.js'
import spotConsumer from './src/consumers/spot/index.js'
import statusConsumer from './src/consumers/status/index.js'
import activityConsumer from './src/consumers/activity/index.js'

const logger = log4js.getLogger('main')

const program = new Command()
program.requiredOption(
  '-t, --consumer-type <consumer type>',
  'consumer type spot|status|actvitiy'
)
program.parse(process.argv)

const options = program.opts()
const consumerType = options.consumerType

logger.info('Starting up: %s', consumerType)
dotenv.config()

logger.info('RABBITMQ_HOST: %s', process.env.RABBITMQ_HOST)
logger.info('RABBITMQ_PORT: %s', process.env.RABBITMQ_PORT)
logger.info(
  'Listening for spots on %s',
  process.env.RABBITMQ_SPOT_QUEUE || 'spot'
)

switch (consumerType) {
  case 'spot':
    spotConsumer()
    break
  case 'status':
    statusConsumer()
    break
  case 'activity':
    activityConsumer()
    break
  default:
    logger.error('Invalid consumer type: %s', consumerType)
    break
}
