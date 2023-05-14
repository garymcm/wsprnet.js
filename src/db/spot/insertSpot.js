import db from '../index.js'

export default function insertSpot(spot) {
  return db('spots').insert(spot)
}
