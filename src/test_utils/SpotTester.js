const start = process.hrtime()

import readline from 'readline'
import fs from 'fs'
import sendMessage from '../message/sendMessage.js'
import log4js from '../logging/index.js'
import setEnvFromArgs from './setEnvFromArgs.js'

const options = setEnvFromArgs()

const logger = log4js.getLogger('SpotTester')

// Open the file stream for reading
const fileStream = fs.createReadStream(options.testFile)

// Create a readline interface for the file stream
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
})

// Constant reporter data
let reporterData = {
  rcall: 'W1GJM',
  rgrid: 'FN42di',
  version: 'CWSL_DIGI 0.85',
  mode: 1,
}

let lineNumber = 0
const maxLines = 1000

const promises = []
logger.info('Sending spot message(s)')

// Listen for the 'line' event, which will be emitted whenever a new line is read
rl.on('line', (line) => {
  lineNumber++
  if (lineNumber >= maxLines) {
    rl.close()
    rl.removeAllListeners()
  }

  let [date, time, sig, dt, tqrg, tcall, tgrid, dBm, drift] = line
    .split(' ')
    .filter((x) => x !== '')

  let spotMessage = {
    date,
    time,
    sig,
    dt,
    tqrg,
    tcall,
    tgrid,
    dBm,
    drift,
    ...reporterData,
  }

  promises.push(sendMessage('spot', spotMessage))
})

// Listen for the 'close' event, which will be emitted when the file stream is closed
rl.on('close', async () => {
  logger.info(`End of file reached, read ${lineNumber} lines.`)
  // Wait for the promises to resolve
  Promise.all(promises).then(() => {
    var precision = 3 // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000 // divide by a million to get nano to milli
    logger.info(
      process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(precision) + ' ms - '
    )
  })

  // process.exit(0)
})

process.on('unhandledRejection', (p, e) => {
  logger.error(p, e)
})
