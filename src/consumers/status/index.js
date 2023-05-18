import amqp from 'amqplib'
import postStatus from '../../controller/status/index.js'
import log4js from '../../logging/index.js'
import * as dotenv from 'dotenv'

export default async function statusConsumer() {
  dotenv.config()

  const logger = log4js.getLogger('statusConsumer')

  const queue = process.env.RABBITMQ_SPOT_QUEUE || 'status'
  const rabbitUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`

  logger.info('Connecting to rabbitmq %s queue %s', rabbitUrl, queue)
  const conn = await amqp.connect(rabbitUrl)
  const channel = await conn.createChannel()

  channel.consume(
    queue,
    async function (msg) {
      if (msg.content) {
        const status = JSON.parse(msg.content.toString())
        const result = await postStatus(status)
        channel.ack(msg)
        logger.trace('postStatus result', result)
      }
    },
    {
      noAck: false,
    }
  )

  channel.on('error', function (err) {
    logger.error('channel error', err)
  })

  logger.info('statusConsumer started')
}
