import calculateBand from '../../consumers/lib/calculateBand.js'
import db from '../../db/index.js'
import log4js from '../../logging/index.js'
import CallSign from '../../types/CallSign.js'
import Grid from '../../types/Grid.js'
import Status from '../../types/Status.js'

const logger = log4js.getLogger('postStatus')

export default async function postSpots(message) {
  const status = new Status()

  const statusCallSign = new CallSign(message.rcall)
  if (!statusCallSign.isValid) {
    logger.warn('callSign [%s] is not valid', message.rcall)
    return false
  }
  status.callSign = statusCallSign

  const statusGrid = new Grid(message.rgrid)
  if (!statusGrid.isValid) {
    logger.warn('grid [%s] is not valid', message.rgrid)
    return false
  }
  status.grid = statusGrid

  status.date = Math.floor(new Date().getTime() / 1000)
  status.band = calculateBand(message.rqrg)

  status.rqrg = message.rqrg
  status.tqrg = message.tqrg
  status.tpct = message.tpct
  status.power = message.dbm
  status.version = message.version

  const whereClause = {
    callSign: status.callSign.toString(),
    band: status.band,
    grid: status.grid.toString(),
  }

  const rows = await db('status').count('callsign as count').where(whereClause)

  logger.trace('status count', rows[0])

  if (rows[0].count > 0) {
    logger.trace('status already exists')
    const update = db('status')
      .where(whereClause)
      .update(status.toUpdateObject())
      .toSQL()
      .toNative()

    logger.trace('running update', update)
    await db('status').where(whereClause).update(status.toUpdateObject())
  } else {
    logger.trace('status does not exist')
    await db('status').insert(status.toInsertObject())
  }
  return true
}
