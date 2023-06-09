import knex from 'knex'
import yn from 'yn'
import * as dotenv from 'dotenv'

dotenv.config()

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

export default db
