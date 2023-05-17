import amqp from 'amqplib'
import post from '../../controller/activity/index.js'
import log4js from '../../logging/index.js'
import * as dotenv from 'dotenv'

export default async function activityConsumer() {
  dotenv.config()

  const logger = log4js.getLogger('activityMessageConsumer')

  const queue = process.env.RABBITMQ_SPOT_QUEUE || 'activity'
  const rabbitUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`

  logger.info('Connecting to rabbitmq %s queue %s', rabbitUrl, queue)
  const conn = await amqp.connect(rabbitUrl)
  const channel = await conn.createChannel()

  channel.consume(
    queue,
    async function (msg) {
      if (msg.content) {
        const status = JSON.parse(msg.content.toString())
        const result = await post(status)
        logger.trace('postActivity result:', result)
      }
    },
    {
      noAck: true,
    }
  )

  logger.info('activityMessageConsumer started')
}
