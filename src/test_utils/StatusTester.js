import sendMessage from '../message/sendMessage.js'
import log4js from '../logging/index.js'
import setEnvFromArgs from './setEnvFromArgs.js'

const options = setEnvFromArgs()
const logger = log4js.getLogger('StatusTester')
const message = JSON.parse(options.jsonString)

logger.info('Sending status message')
try {
  await sendMessage('status', message)
  logger.info('Sent')
} catch (error) {
  logger.error('Error sending message', error)
} finally {
  process.exit(0)
}
