import post from '../../controller/status/index.js'
import log4js from '../../logging/index.js'

import Consumer from '../Consumer.js'

export default async function statusConsumer() {
  const logger = log4js.getLogger('starting statusConsumer')
  const statusConsumer = new Consumer('statusConsumer', post)
  await statusConsumer.start()
  await statusConsumer.consume()
  logger.info('statusConsumer started')
}
