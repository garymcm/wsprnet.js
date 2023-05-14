import amqp from 'amqplib'
import postStatus from '../../controller/status/index.js'
import log4js from '../../logging/index.js'

const queue = 'status'
const rabbitUrl = 'amqp://192.168.2.188'
const logger = log4js.getLogger('statusMessageConsumer')

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

logger.info('statusMessageConsumer started')
