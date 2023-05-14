import amqp from 'amqplib'
import log4js from '../logging/index.js'
const logger = log4js.getLogger('sendMessage')
const rabbitUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`

const connection = await amqp.connect(rabbitUrl)
const channel = await connection.createChannel()

export default async function sendMessage(queue, message) {
  try {
    channel.assertQueue(queue, {
      durable: true,
    })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
  } catch (error) {
    logger.error('Error sending message', error)
  }
}
