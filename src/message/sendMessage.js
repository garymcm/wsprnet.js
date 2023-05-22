import amqp from 'amqplib'
import log4js from '../logging/index.js'
const logger = log4js.getLogger('sendMessage')

export default async function sendMessage(queue, message) {
  const rabbitUrl = process.env.RABBITMQ_URL
  logger.info('Connecting to rabbitmq', rabbitUrl)
  let connection
  try {
    connection = await amqp.connect(rabbitUrl)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue, {
      durable: true,
    })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    await channel.close()
  } catch (error) {
    logger.error('Error sending message', error)
  } finally {
    if (connection) await connection.close()
  }
}
