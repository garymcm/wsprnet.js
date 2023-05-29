import knex from 'knex'
import yn from 'yn'
import * as dotenv from 'dotenv'
import log4js from '../logging/index.js'

const logger = log4js.getLogger('db')

dotenv.config()

logger.info('DATABASE_DIALECT:', process.env.DATABASE_DIALECT)
logger.info('DATABASE_HOSTNAME:', process.env.DATABASE_HOST)
logger.info('DATABASE_PORT:', process.env.DATABASE_PORT)
logger.info('DATABASE_NAME:', process.env.DATABASE_NAME)
logger.info('DATABASE_POOL:', process.env.DATABASE_POOL)
logger.info('DATABASE_USERNAME:', process.env.DATABASE_USERNAME)

const baseConfig = {
  client: process.env.DATABASE_DIALECT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
}

const poolConfig = {}
if (yn(process.env.DATABASE_POOL)) {
  poolConfig.max = +process.env.DATABASE_POOL_MAX
  poolConfig.min = +process.env.DATABASE_POOL_MIN
  poolConfig.idleTimeoutMillis = +process.env.DATABASE_POOL_IDLE
  poolConfig.acquireTimeoutMillis = +process.env.DATABASE_POOL_ACQUIRE
  poolConfig.destroyTimeoutMillis = +process.env.DATABASE_POOL_EVICT
}

const db = knex({
  ...baseConfig,
  pool: {
    ...poolConfig,
    propagateCreateError: false,
    reapIntervalMillis: 1000,
  },
})

// db.client.pool.on('createFail', (eventId, err) => {
//   logger.error('db connection createFail', eventId, err)
// })

// db.client.pool.on('createSuccess', (eventId, resource) => {
//   logger.info('db connection createSuccess', eventId, resource)
// })

export default db
