import Grid from '../Grid.js'

describe('Test CallSigns class', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined()
  })

  it('should be valid', () => {
    expect(new Grid('FN42').isValid).toBe(true)
    expect(new Grid('fN42').isValid).toBe(true)
    expect(new Grid('fn42').isValid).toBe(true)
    expect(new Grid('FN42aa').isValid).toBe(true)
    expect(new Grid('FN42AA').isValid).toBe(true)
    expect(new Grid('FN42AA').isValid).toBe(true)
    expect(new Grid('FN42aaAA').isValid).toBe(true)
  })

  it('should be invalid', () => {
    expect(new Grid('FN4').isValid).toBe(false)
    expect(new Grid('FN42a&').isValid).toBe(false)
    expect(new Grid('FN42a1').isValid).toBe(false)
    expect(new Grid('F2A2a1').isValid).toBe(false)
    expect(new Grid('SN42aa').isValid).toBe(false)
    expect(new Grid('FS42aa').isValid).toBe(false)
  })

  it('should be normalized', () => {
    expect(new Grid('FN42aaAA').toString()).toBe('FN42aa')
    expect(new Grid('fn42aa').toString()).toBe('FN42aa')
    expect(new Grid('fn42AA').toString()).toBe('FN42aa')
  })

  it('it should be equal', () => {
    expect(new Grid('FN42aa').equals('FN42aa')).toBe(true)
    expect(new Grid('FN42aa').equals(new Grid('FN42aa'))).toBe(true)
    expect(new Grid('Fn42aa').equals(new Grid('FN42Aa'))).toBe(true)
    expect(new Grid('Fn42aa').equals(new Grid('FN42aaAA'))).toBe(true)
  })

  it('should not be equal', () => {
    expect(new Grid('FN42aa').equals('FN42')).toBe(false)
    expect(new Grid('FN42aa').equals('FN42ab')).toBe(false)
    expect(new Grid('FN42aa').equals(new Grid('FN42ab'))).toBe(false)
    expect(new Grid('Fn42aa').equals(new Grid('FN42A'))).toBe(false)
  })
})
