import db from '../index.js'

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
}
