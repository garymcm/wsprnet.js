import calculateUnixEpoch from '../calculateUnixEpoch'

let date = '230509'
let time = '104800'
let expectedReturn = 1683629280

describe('calculateUnixEpoch', () => {
  it('should be defined', () => {
    expect(calculateUnixEpoch).toBeDefined()
  })

  it('should be the expected unix epoch', async () => {
    expect(calculateUnixEpoch(date, time)).toBe(expectedReturn)
  })

  it('should be undefined', () => {
    expect(calculateUnixEpoch()).toBeUndefined()
  })
})
