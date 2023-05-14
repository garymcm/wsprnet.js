export default function calculateFrequency(freq) {
  if (freq < 0.25) return -1
  else return Math.floor(freq)
}
