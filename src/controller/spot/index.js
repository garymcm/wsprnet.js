import CallSign from '../../types/CallSign.js'
import Spot from '../../types/Spot.js'
import resolveGrid from '../../consumers/lib/resolveGrid.js'
import { getGridDistanceAndBearing } from '../../consumers/lib/calculateGridDistanceAndBearing.js'
import calculateBand from '../../consumers/lib/calculateBand.js'
import db from '../../db/index.js'
import calculateUnixEpoch from '../../consumers/lib/calculateUnixEpoch.js'
import log4js from '../../logging/index.js'

const logger = log4js.getLogger('postSpots')

let count = 0

export default async function postSpots(message) {
  logger.trace('postSpots', count++)
  const thisSpotId = count

  const spot = new Spot()

  spot.reporter = new CallSign(message.rcall)
  if (!spot.reporter.isValid) {
    logger.info('rx callSign is not valid: %s', message.rcall)
    return
  }

  spot.callSign = new CallSign(message.tcall)
  if (!spot.callSign.isValid) {
    logger.info('tx callSign is not valid: %s', message.tcall)
    return
  }

  spot.reporterGrid = await resolveGrid(spot.reporter, message.rgrid)
  if (!spot.reporterGrid.isValid) {
    logger.info('rx grid is not valid: %s', message.rgrid)
    return
  }

  spot.grid = await resolveGrid(spot.callSign, message.tgrid)
  if (!spot.grid.isValid) {
    logger.info('tx grid is not valid: %s', message.tgrid)
    return
  }

  const distanceBearing = spot.grid.getDistanceBearingTo(spot.reporterGrid)
  spot.distance = distanceBearing.distance
  spot.azimuth = distanceBearing.bearing
  spot.band = calculateBand(message.tqrg)
  spot.date = calculateUnixEpoch(message.date, message.time)
  if (!spot.date) {
    logger.warn('date is not valid: %s %s', message.date, message.time)
    return
  }

  if (spot.date > Date.now() / 1000) {
    logger.warn('date is in the future: %s %s', message.date, message.time)
    return count
  }

  // Straight copy from reporting client message
  spot.version = message.version
  spot.code = message.mode
  spot.dB = message.sig
  spot.mhz = message.tqrg
  spot.drift = message.drift
  spot.dt = message.dt
  spot.power = message.dbm

  await db('spots').insert(spot.toInsertObject())
  return thisSpotId
}
