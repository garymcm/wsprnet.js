import post from '../../controller/grid6/index.js'
import log4js from '../../logging/index.js'

import Consumer from '../Consumer.js'

export default async function grid6Consumer() {
  const logger = log4js.getLogger('starting grid6Consumer')
  const grid6Consumer = new Consumer('grid6Consumer', post)
  await grid6Consumer.start()
  await grid6Consumer.consume()
  logger.info('grid6Consumer started')
}
