import sendMessage from '../message/sendMessage.js'
import log4js from '../logging/index.js'
import setEnvFromArgs from './setEnvFromArgs.js'

const options = setEnvFromArgs()

const logger = log4js.getLogger('StatusTester')

const message = {
  rcall: 'W1GJM',
  rgrid: 'FN42di',
  rqrg: '21.0969999',
  tqrg: '21.0969999',
  tpct: '5',
  dbm: '37',
  version: 'CWSL_DIGI 0.85',
}

logger.info('Sending status message')
await sendMessage('status', message)
logger.info('Sent')
