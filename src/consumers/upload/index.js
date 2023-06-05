import post from '../../controller/spot/index.js'
import log4js from '../../logging/index.js'

import Consumer from '../Consumer.js'

export default async function spotConsumer() {
  const logger = log4js.getLogger('starting uploadConsumer')
  const spotConsumer = new Consumer('uploadConsumer', post)
  await spotConsumer.start()
  await spotConsumer.consume()
  logger.info('uploadConsumer started')
}
