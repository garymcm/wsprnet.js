const REGEXP_VALIDATOR = /^[A-R]{2}[0-9]{2}([a-x]{2})?$/

export default class Grid {
  #isValid = false
  #grid = ''

  static INVALID_GRID = new Grid('')

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

  distanceTo(otherGrid) {
    if (!this.#isValid || !otherGrid.#isValid) {
      return 0
    }

    let fromGrid = this.toString()
    if (fromGrid.length === 4) {
      fromGrid += 'll'
    }

    let toGrid = otherGrid.toString()
    if (toGrid.length === 4) {
      toGrid += 'll'
    }
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
