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
export default async function updateGrid6ForCallSign(callSign, grid) {
  try {
    await db('grid6')
      .insert({
        CallSign: callSign,
        Grid: grid,
      })
      .onConflict('CallSign')
      .merge()
    logger.trace('Updated grid6 for %s @ %s', callSign, grid)
  } catch (error) {
    logger.error('Error updating grid6', error)
  }
}
