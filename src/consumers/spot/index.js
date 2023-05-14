import amqp from 'amqplib'
import post from '../../controller/spot/index.js'
import log4js from '../../logging/index.js'
import * as dotenv from 'dotenv'

export default async function spotConsumer() {
  dotenv.config()

  const logger = log4js.getLogger('spotMessageConsumer')

  const queue = process.env.RABBITMQ_SPOT_QUEUE || 'spot'
  const rabbitUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
  logger.info('Connecting to rabbitmq %s queue %s', rabbitUrl, queue)

  const conn = await amqp.connect(rabbitUrl)
  const channel = await conn.createChannel()

  channel.assertQueue(queue, {
    durable: true,
  })

  channel.consume(
    queue,
    async function (msg) {
      if (msg.content) {
        const spot = JSON.parse(msg.content.toString())
        const count = await post(spot)

        logger.trace('acking post', count)
        channel.ack(msg)
        logger.trace('post result', count)
      }
    },
    {
      noAck: false,
    }
  )
}
