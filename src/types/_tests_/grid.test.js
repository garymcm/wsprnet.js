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

  it('distance and bearing should be valid', () => {
    const distanceBearing = new Grid('FN42aa').getDistanceBearingTo('FN42aa')
    expect(distanceBearing.distance).toBe(0)
    expect(distanceBearing.bearing).toBe(0)

    const distanceBearing2 = new Grid('FN42aa').getDistanceBearingTo('FN42ab')
    expect(distanceBearing2.distance).toBe(5)
    expect(distanceBearing2.bearing).toBe(0)

    const distanceBearing2a = new Grid('FN42aa').getDistanceBearingTo(
      new Grid('FN42ab')
    )
    expect(distanceBearing2a.distance).toBe(5)
    expect(distanceBearing2a.bearing).toBe(0)

    const distanceBearing3 = new Grid('JN58').getDistanceBearingTo(
      new Grid('IO87')
    )
    expect(distanceBearing3.distance).toBe(1366)
    expect(distanceBearing3.bearing).toBe(322)
  })

  it('distance and bearing should be invalid', () => {
    const distanceBearing4 = new Grid('JN58qc').getDistanceBearingTo('ZZ87lp')
    expect(distanceBearing4).toBe(Grid.INVALID_DISTANCE_BEARING)

    const distanceBearing4a = new Grid('JN58qc').getDistanceBearingTo(
      new Grid('ZZ87lp')
    )
    expect(distanceBearing4a).toBe(Grid.INVALID_DISTANCE_BEARING)
  })
})
