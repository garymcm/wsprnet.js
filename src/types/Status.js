export default class Status {
  #date
  #version
  #callSign
  #grid
  #rqrg
  #tqrg
  #tpct
  #power
  #band

  set date(date) {
    this.#date = date
  }

  get date() {
    return this.#date
  }

  set version(version) {
    this.#version = version
  }

  get version() {
    return this.#version
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

  set rqrg(rqrg) {
    this.#rqrg = rqrg
  }

  get rqrg() {
    return this.#rqrg
  }

  set tqrg(tqrg) {
    this.#tqrg = tqrg
  }

  get tqrg() {
    return this.#tqrg
  }

  set tpct(tpct) {
    this.#tpct = tpct
  }

  get tpct() {
    return this.#tpct
  }

  set power(power) {
    this.#power = power
  }

  get power() {
    return this.#power
  }

  set band(band) {
    this.#band = band
  }

  get band() {
    return this.#band
  }

  toUpdateObject() {
    return this.toInsertObject()
  }

  toInsertObject() {
    return {
      date: this.#date,
      callSign: this.#callSign.toString(),
      grid: this.#grid.toString(),
      rx: this.#rqrg,
      tx: this.#tqrg,
      tpct: this.#tpct,
      dbm: this.#power,
      band: this.#band,
      version: this.#version.substring(0, 10),
    }
  }
}
