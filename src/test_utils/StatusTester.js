import sendMessage from '../message/sendMessage.js'
import log4js from '../logging/index.js'
import setEnvFromArgs from './setEnvFromArgs.js'

const options = setEnvFromArgs()

const logger = log4js.getLogger('StatusTester')

console.log(options.jsonString)

const message = JSON.parse(options.jsonString)

logger.info('Sending status message')
await sendMessage('status', message)
logger.info('Sent')
