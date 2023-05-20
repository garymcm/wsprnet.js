/**
 * A lightweight class to represent a distance and bearing.
 *
 * @export
 * @class DistanceBearing
 */
export default class DistanceBearing {
  #distance = 0
  #bearing = 0

  constructor(distance, bearing) {
    this.#distance = distance
    this.#bearing = bearing
  }

  get distance() {
    return this.#distance
  }

  get bearing() {
    return this.#bearing
  }

  equals(otherDistanceBearing) {
    if (otherDistanceBearing instanceof DistanceBearing) {
      return (
        this.#distance === otherDistanceBearing.#distance &&
        this.#bearing === otherDistanceBearing.#bearing
      )
    }
    return false
  }

  toString() {
    return `Distance: ${this.#distance} Bearing: ${this.#bearing}`
  }
}
