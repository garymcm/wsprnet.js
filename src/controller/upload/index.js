import events from 'events'
import fs from 'fs'
import readline from 'readline'

import CallSign from '../../types/CallSign.js'
import log4js from '../../logging/index.js'
import resolveGrid from '../../consumers/lib/resolveGrid.js'
import getMode from '../../consumers/lib/getMode.js'
import Spot from '../../types/Spot.js'
import calculateBand from '../../consumers/lib/calculateBand.js'
import calculateUnixEpoch from '../../consumers/lib/calculateUnixEpoch.js'

const logger = log4js.getLogger('postSpots')

export default async function post(message) {
  logger.trace('uploadSpots')

  const reporter = new CallSign(message.call)
  if (!reporter.isValid) {
    logger.info('Reporting callSign is not valid: %s', message.rcall)
    return
  }

  const reporterGrid = await resolveGrid(reporter, message.grid)
  if (!reporterGrid.isValid) {
    logger.info('rx grid is not valid: %s', message.rgrid)
    return
  }

  const version = message.version ?? null

  const common = {
    reporter: reporter,
    reporterGrid: reporterGrid,
    version: version,
  }

  processLineByLine(message.file, common)
}

async function processLineByLine(fileName, common) {
  try {
    const reporter = new CallSign(common.reporter)
    if (!reporter.isValid) {
      logger.info('tx callSign is not valid: %s', common.reporter)
      return
    }

    const reporterGrid = await resolveGrid(reporter, reporterGrid)
    if (!reporterGrid.isValid) {
      logger.info('tx grid is not valid: %s', reporterGrid)
      return
    }

    const rl = readline.createInterface({
      input: fs.createReadStream(fileName),
      crlfDelay: Infinity,
    })

    rl.on('line', async (line) => {
      const [date, time, , sig, dt, tqrg, tcall, tgrid, dbm, drift, mode] = line
        .split(' ')
        .map((item) => item.trim())

      const spot = new Spot()
      spot.date = calculateUnixEpoch(date, time)

      spot.reporter = reporter
      spot.reporterGrid = reporterGrid
      spot.version = common.version

      spot.callSign = new CallSign(tcall)
      if (!spot.callSign.isValid) {
        logger.info('tx callSign is not valid: %s', tcall)
        return
      }

      spot.grid = await resolveGrid(spot.callSign, tgrid)
      if (!spot.grid.isValid) {
        logger.info('tx grid is not valid: %s', tgrid)
        return
      }

      spot.code = getMode(mode)

      spot.grid = await resolveGrid(spot.callSign, tgrid)
      if (!spot.grid.isValid) {
        logger.info('tx grid is not valid: %s', tgrid)
        return
      }

      const distanceBearing = spot.grid.getDistanceBearingTo(reporterGrid)
      spot.distance = distanceBearing.distance
      spot.azimuth = distanceBearing.bearing
      spot.band = calculateBand(tqrg)
      spot.mhz = tqrg
      spot.dt = dt
      spot.power = dbm
      spot.drift = drift
      spot.dB = sig

      logger.debug('spot: %s', spot.toInsertObject())
    })

    await events.once(rl, 'close')
  } catch (error) {
    logger.error('Error reading file: %s', error)
  }
}
