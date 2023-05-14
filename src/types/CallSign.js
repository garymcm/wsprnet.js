const REGEXP_VALIDATOR = /^[^\s\p{Cc}\\.]+$/u

export default class CallSign {
  #isValid = false
  #callSignName = ''

  constructor(callSign) {
    let normalizedCall = this.#normalize(callSign)
    const callLength = normalizedCall?.length || 0
    // if the call is less than 3 or more than 12, it's not valid
    if (callLength < 3 || callLength > 12) {
      this.#isValid
    } else if (!REGEXP_VALIDATOR.test(normalizedCall)) {
      this.#isValid = false
    } else {
      this.#isValid = true
    }
    this.#callSignName = normalizedCall
  }

  get isValid() {
    return this.#isValid
  }

  equals(otherCallSign) {
    if (otherCallSign instanceof CallSign) {
      return (
        this.#callSignName === otherCallSign.#callSignName &&
        this.#isValid === otherCallSign.#isValid
      )
    }
    return this.#callSignName === this.#normalize(otherCallSign)
  }

  toString() {
    return this.#callSignName
  }

  #normalize(callSign) {
    let normalizedCall = callSign?.toUpperCase()
    // if call starts with <, remove the first and last characters
    if (
      normalizedCall?.slice(0, 1) === '<' &&
      normalizedCall?.slice(-1) === '>'
    ) {
      normalizedCall = normalizedCall.slice(1, normalizedCall.length - 1)
    }
    return normalizedCall
  }
}
