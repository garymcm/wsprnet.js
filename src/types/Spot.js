export default class Spot {
  #version
  #date
  #reporter
  #reporterGrid
  #dB
  #mhz
  #callSign
  #grid
  #power
  #drift
  #band
  #distance
  #azimuth
  #code = 1 // WSPR-2 mode is the default if this value is not provided
  #sig

  set version(version) {
    this.#version = version
  }

  get version() {
    return this.#version
  }

  set date(date) {
    this.#date = date
  }

  get date() {
    return this.#date
  }

  set reporter(reporter) {
    this.#reporter = reporter
  }

  get reporter() {
    return this.#reporter
  }

  set reporterGrid(reporterGrid) {
    this.#reporterGrid = reporterGrid
  }

  get reporterGrid() {
    return this.#reporterGrid
  }

  set dB(dB) {
    this.#dB = dB
  }

  get dB() {
    return this.#dB
  }

  set mhz(mhz) {
    this.#mhz = mhz
  }

  get mhz() {
    return this.#mhz
  }

  set callSign(callSign) {
    this.#callSign = callSign
  }

  get callSign() {
    return this.#callSign
  }

  set grid(grid) {
    this.#grid = grid
  }

  get grid() {
    return this.#grid
  }

  set power(power) {
    this.#power = power
  }

  get power() {
    return this.#power
  }

  set drift(drift) {
    this.#drift = drift
  }

  get drift() {
    return this.#drift
  }

  set band(band) {
    this.#band = band
  }

  get band() {
    return this.#band
  }

  set distance(distance) {
    this.#distance = distance
  }

  get distance() {
    return this.#distance
  }

  set azimuth(azimuth) {
    this.#azimuth = azimuth
  }

  get azimuth() {
    return this.#azimuth
  }

  set code(code) {
    this.#code = code
  }

  get code() {
    return this.#code
  }

  set sig(sig) {
    this.#sig = sig
  }

  get sig() {
    return this.#sig
  }

  toInsertObject() {
    return {
      version: this.#version.substring(0, 10),
      date: this.#date,
      reporter: this.#reporter.toString(),
      reporterGrid: this.#reporterGrid.toString(),
      dB: this.#dB,
      mhz: this.#mhz,
      callSign: this.#callSign.toString(),
      grid: this.#grid.toString(),
      power: this.#power,
      drift: this.#drift,
      band: this.#band,
      distance: this.#distance,
      azimuth: this.#azimuth,
      code: this.#code,
    }
  }
}
