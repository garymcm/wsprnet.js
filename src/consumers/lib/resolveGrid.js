import Grid from '../../types/Grid.js'
import getGrid6ForCallSign from '../../db/grid/getGrid6ForCallSign.js'
import updateGrid6ForCallSign from '../../db/grid/updateGrid6ForCallSign.js'
import log4js from '../../logging/index.js'

const logger = log4js.getLogger('resolveGrid')

export default async function resolveGrid(callSign, grid) {
  let resolvedGrid
  const reportedGrid = new Grid(grid)
  if (!reportedGrid.isValid) {
    console.log('grid is not valid')
    return Grid.INVALID_GRID
  }

  const storedGrid = await getGrid6ForCallSign(callSign.toString())
  if (!storedGrid.isValid) {
    resolvedGrid = reportedGrid
  } else {
    resolvedGrid = storedGrid
  }
  if (!storedGrid.isGrid6() && reportedGrid.isGrid6()) {
    logger.trace('recording a new grid6')
    await updateGrid6ForCallSign(callSign, reportedGrid)
  }
  return resolvedGrid
}
