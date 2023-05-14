const {
  getGridDistanceAndBearing,
  grid2lat,
  grid2lon,
} = require('../calculateGridDistanceAndBearing')

describe('grid distance and bearing tests', () => {
  it('should be defined', () => {
    expect(getGridDistanceAndBearing).toBeDefined()
    expect(grid2lat).toBeDefined()
  })

  it('should be the correct latitude', async () => {
    expect(grid2lat('FN42di')).toBe(0.7392196602717648)
  })

  it('should be the correct latitude (4 char grid)', async () => {
    expect(grid2lat('FN42')).toBe(0.7414013218367578)
  })

  it('should be the correct longtitude', async () => {
    expect(grid2lon('FN42di')).toBe(-1.251546517784267)
  })

  it('should be the correct longtitude (4 char grid)', async () => {
    expect(grid2lon('FN42')).toBe(-1.2399109894376383)
  })

  it('should be the correct distance', async () => {
    expect(getGridDistanceAndBearing('JN58qc', 'IO87lp')).toEqual({
      distance: 1430,
      bearing: 323,
    })

    expect(getGridDistanceAndBearing('JN58', 'IO87')).toEqual({
      distance: 1366,
      bearing: 322,
    })

    expect(getGridDistanceAndBearing('FN42di', 'FN42di')).toEqual({
      distance: 0,
      bearing: 0,
    })
  })
})
