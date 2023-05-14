import log4js from '../../logging/index.js'
const logger = log4js.getLogger('post_activity')

export default async function post(message) {
  logger.info('post_activity', message)
  return true
}
