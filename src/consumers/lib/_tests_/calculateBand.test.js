import calculateBand from '../calculateBand'

describe('calculateBand', () => {
  it('should be defined', () => {
    expect(calculateBand).toBeDefined()
  })

  it('should be the correct frequency', async () => {
    expect(calculateBand(14.12212)).toBe(14)
  })

  it('should be -1', async () => {
    expect(calculateBand(0.12212)).toBe(-1)
  })
})
