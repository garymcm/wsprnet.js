import db from '../index.js'
import log4js from '../../logging/index.js'

const logger = log4js.getLogger('updateGrid6ForCallSign')
/**
 * Update the `grid6` table for the given call sign and grid.
 *
 * @export
 * @param {string} callSign
 * @param {string} grid
 * @return {*}
 */
export default function updateGrid6ForCallSign(callSign, grid) {
  return db('grid6')
    .insert({
      CallSign: callSign,
      Grid: grid,
    })
    .onConflict('CallSign')
    .merge()
    .catch((err) => {
      logger.error('Error updating grid6', err)
    })
    .then(() => {
      logger.trace('Updated grid6 for %s @ %s', callSign, grid)
    })
}
