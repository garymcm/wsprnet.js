import db from '../index.js'

export default function updateGrid6ForCallSign(callSign, grid6) {
  return db('grid6')
    .insert({
      CallSign: callSign.toString(),
      Grid: grid6.toString(),
    })
    .onConflict('CallSign')
    .merge()
}
