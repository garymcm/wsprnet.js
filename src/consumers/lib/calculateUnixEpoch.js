export default function calculateUnixEpoch(date, time) {
  if (!date || !time) return undefined
  const [year, month, day] = [
    20 + date.substring(0, 2),
    date.substring(2, 4) - 1,
    date.substring(4),
  ]
  const [hour, minute, second] = [
    time.substring(0, 2),
    time.substring(2, 4),
    '00',
  ]

  let d =
    new Date(Date.UTC(year, month, day, hour, minute, second)).getTime() / 1000
  return d
}
