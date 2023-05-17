const start = process.hrtime()
import { Command } from 'commander'

import readline from 'readline'
import fs from 'fs'
import sendMessage from '../message/sendMessage.js'
import log4js from '../logging/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const program = new Command()
program.option('-q, --queue <queue>', 'rabbitmq queue name', 'spot')
program.requiredOption('-h, --rabbitmq-host <host/ip>', 'rabbitmq host name')
program.requiredOption('-p, --rabbitmq-port <port>', 'rabbitmq port number')
program.parse(process.argv)

const options = program.opts()

process.env.RABBITMQ_HOST = options.rabbitmqHost
process.env.RABBITMQ_PORT = options.rabbitmqPort
process.env.RABBITMQ_SPOT_QUEUE = options.queue

const logger = log4js.getLogger('SpotTester')

// Open the file stream for reading
const fileStream = fs.createReadStream('./misc/ALL_WSPR.TXT')

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
