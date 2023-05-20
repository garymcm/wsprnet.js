const REGEXP_VALIDATOR = /^[A-R]{2}[0-9]{2}([a-x]{2})?$/
import { getGridDistanceAndBearing } from '../consumers/lib/calculateGridDistanceAndBearing.js'
import DistanceBearing from './DistanceBearing.js'

export default class Grid {
  #isValid = false
  #grid = ''

  static INVALID_GRID = new Grid('')
  static INVALID_DISTANCE_BEARING = new DistanceBearing(0, 0)

  constructor(gridName) {
    let normalizedGrid = this.#normalize(gridName)
    if (normalizedGrid.match(REGEXP_VALIDATOR) === null) {
      this.#isValid = false
    } else {
      this.#isValid = true
    }
    this.#grid = normalizedGrid
  }

  get isValid() {
    return this.#isValid
  }

  toString() {
    return this.#grid
  }

  isGrid6() {
    return this.#isValid && this.#grid.length === 6
  }

  equals(otherGrid) {
    if (otherGrid instanceof Grid) {
      return (
        this.#grid === otherGrid.#grid && this.#isValid === otherGrid.#isValid
      )
    }
    return this.#grid === this.#normalize(otherGrid)
  }

  getDistanceBearingTo(otherGrid) {
    if (!(otherGrid instanceof Grid)) {
      otherGrid = new Grid(otherGrid)
    }
    if (!this.#isValid || !otherGrid.#isValid) {
      return this.constructor.INVALID_DISTANCE_BEARING
    }

    return getGridDistanceAndBearing(this.#grid, otherGrid.#grid)
  }

  #normalize(grid) {
    let formattedGrid =
      grid.substring(0, 2).toUpperCase() + grid.substring(2, 4)
    if (grid.length >= 6) {
      formattedGrid += grid.substring(4, 6).toLowerCase()
    }
    return formattedGrid
  }
}
