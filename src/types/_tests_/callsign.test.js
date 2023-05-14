import CallSign from '../CallSign.js'

describe('Test CallSigns class', () => {
  it('should be defined', () => {
    expect(CallSign).toBeDefined()
  })

  it('should be valid', () => {
    expect(new CallSign('W1AW').isValid).toBe(true)
    expect(new CallSign('WA1AWW').isValid).toBe(true)
    expect(new CallSign('W1A').isValid).toBe(true)
    expect(new CallSign('SWL123456').isValid).toBe(true)
    expect(new CallSign('W1A123&1').isValid).toBe(true)
  })

  it('should be invalid', () => {
    expect(new CallSign('').isValid).toBe(false)
    expect(new CallSign(null).isValid).toBe(false)
    expect(new CallSign(undefined).isValid).toBe(false)
    expect(new CallSign(' ').isValid).toBe(false)
    expect(new CallSign('W1').isValid).toBe(false)
    expect(new CallSign('W1A1234567890').isValid).toBe(false)
    expect(new CallSign('W1A123.1').isValid).toBe(false)
    expect(new CallSign('W1A123\n1').isValid).toBe(false)
  })

  it('should be normalized', () => {
    expect(new CallSign('w1aw').toString()).toBe('W1AW')
    expect(new CallSign('w1Aw').toString()).toBe('W1AW')
    expect(new CallSign('<w1Aw>').toString()).toBe('W1AW')
  })

  it('it should be equal', () => {
    expect(new CallSign('W1AW').equals('W1AW')).toBe(true)
    expect(new CallSign('W1AW').equals('w1aw')).toBe(true)
    expect(new CallSign('W1AW').equals(new CallSign('W1AW'))).toBe(true)
    expect(new CallSign('W1AW').equals(new CallSign('w1aw'))).toBe(true)
  })

  it('should not be equal', () => {
    expect(new CallSign('W1AW').equals('W1AWW')).toBe(false)
    expect(new CallSign('W1AW').equals('W1A')).toBe(false)
    expect(new CallSign('W1AW').equals(new CallSign('W1AWW'))).toBe(false)
  })
})
