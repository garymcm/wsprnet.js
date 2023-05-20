import amqp from 'amqplib'
import log4js from '../logging/index.js'
const logger = log4js.getLogger('sendMessage')

export default async function sendMessage(queue, message) {
  const rabbitUrl = `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
  logger.info('Connecting to rabbitmq', rabbitUrl)
  try {
    const connection = await amqp.connect(rabbitUrl)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, {
      durable: true,
    })
    logger.info('Sending message', message)
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    await channel.close()
    await connection.close()
  } catch (error) {
    logger.error('Error sending message', error)
  }
}
