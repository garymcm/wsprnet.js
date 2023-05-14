import amqp from 'amqplib'
import postActivity from '../../controller/activity/index.js'
import log4js from '../../logging/index.js'

const queue = 'activity'
const rabbitUrl = 'amqp://192.168.2.188'
const logger = log4js.getLogger('activityMessageConsumer')

const conn = await amqp.connect(rabbitUrl)
const channel = await conn.createChannel()

channel.consume(
  queue,
  async function (msg) {
    if (msg.content) {
      const status = JSON.parse(msg.content.toString())
      const result = await postActivity(status)
      logger.trace('postActivity result:', result)
    }
  },
  {
    noAck: true,
  }
)

logger.info('activityMessageConsumer started')
