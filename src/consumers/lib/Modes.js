const Modes = {
  2: 1, // WSPR-2
  15: 2, // WSPR-15 & FST4W -900
  3: 3, // FST4W-120
  5: 4, // FST4W-300
  16: 2, // FST4W-900 (code 16 is deprecated since wsjt-x 2.6.1)
  30: 8, // FST4W-1800
}

export default function getMode(code) {
  return Modes[code] ?? -1
}
