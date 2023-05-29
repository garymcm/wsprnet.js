import db from '../index.js'
import Grid from '../../types/Grid.js'

export default function getGrid6(call) {
  return db('grid6')
    .select('CallSign', 'grid')
    .where('CallSign', call)
    .then((result) => {
      if (result.length === 0) {
        return Grid.INVALID_GRID
      }
      return new Grid(result[0].grid)
    })
}
