import * as dotenv from 'dotenv'
import spotConsumer from './src/consumers/spot/index.js'
import log4js from '../../logging/index.js'

const logger = log4js.getLogger('main')

logger.info('Starting up')
dotenv.config()

logger.info('RABBITMQ_HOST: %s', process.env.RABBITMQ_HOST)
logger.info('RABBITMQ_PORT: %s', process.env.RABBITMQ_PORT)
logger.info(
  'Listening for spots on %s',
  process.env.RABBITMQ_SPOT_QUEUE || 'spot'
)

spotConsumer()
