function deg2rad(degrees) {
  var pi = Math.PI
  return degrees * (pi / 180)
}

function rad2deg(rad) {
  return rad * (180 / Math.PI)
}

export function grid2lat(grid) {
  let upperGrid = grid.toUpperCase()
  if (grid.length === 4) {
    upperGrid += 'LL'
  }

  const lat =
    (upperGrid.charCodeAt(1) - 65) * 10 +
    (upperGrid.charCodeAt(3) - 48) +
    (upperGrid.charCodeAt(5) - 65 + 0.5) / 24 -
    90
  return deg2rad(lat)
}

export function grid2lon(grid) {
  let upperGrid = grid.toUpperCase()
  if (grid.length === 4) {
    upperGrid += 'LL'
  }
  const lon =
    (upperGrid.charCodeAt(0) - 65) * 20 +
    (upperGrid.charCodeAt(2) - 48) * 2 +
    (upperGrid.charCodeAt(4) - 65 + 0.5) / 12 -
    180
  return deg2rad(lon)
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) return 0
  //standard geodetic formula for great circle distances, returns result in radians
  let distrad = Math.acos(
    Math.cos(lat1) * Math.cos(lon1) * Math.cos(lat2) * Math.cos(lon2) +
      Math.cos(lat1) * Math.sin(lon1) * Math.cos(lat2) * Math.sin(lon2) +
      Math.sin(lat1) * Math.sin(lat2)
  )
  return Math.round(distrad * 6371.0)
}

export function calculateBearing(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) return 0
  const pi = Math.PI
  let co =
    Math.cos(lon1 - lon2) * Math.cos(lat1) * Math.cos(lat2) +
    Math.sin(lat1) * Math.sin(lat2)
  let ca = Math.atan(Math.abs(Math.sqrt(1 - co * co) / co))
  if (co < 0) ca = pi - ca
  let si = Math.sin(lon2 - lon1) * Math.cos(lat2) * Math.cos(lat1)
  co = Math.sin(lat2) - Math.sin(lat1) * Math.cos(ca)
  let az = Math.atan(Math.abs(si / co))
  if (co < 0) az = pi - az
  if (si < 0) az = -az
  if (az < 0) az = az + 2 * pi
  const bearing = rad2deg(az)
  return Math.round(bearing)
}

export function getGridDistanceAndBearing(fromGrid, toGrid) {
  const fromLat = grid2lat(fromGrid.toString())
  const fromLon = grid2lon(fromGrid.toString())
  const toLat = grid2lat(toGrid.toString())
  const toLon = grid2lon(toGrid.toString())
  return {
    distance: calculateDistance(fromLat, fromLon, toLat, toLon),
    bearing: calculateBearing(fromLat, fromLon, toLat, toLon),
  }
}
