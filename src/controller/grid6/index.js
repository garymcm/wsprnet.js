import updateGrid6ForCallSign from '../../db/grid/updateGrid6ForCallSign.js'
import log4js from '../../logging/index.js'

const logger = log4js.getLogger('postGrid6')

export default async function postSpots(message) {
  const { callSign, grid } = message
  logger.trace('postGrid6: %s @ %s', callSign, grid)
  return updateGrid6ForCallSign(callSign, grid)
}
