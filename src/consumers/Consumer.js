import amqp from 'amqplib'
import * as dotenv from 'dotenv'

import log4js from '../logging/index.js'

/**
 * A general consumer for rabbitmq
 *
 * @export
 * @class Consumer
 */
export default class Consumer {
  #name = 'Unnamed Consumer'
  #logger
  #queue
  #rabbitUrl
  #isReconnecting = false
  #channel
  #conn
  #messageProcessor = async () => {}

  constructor(name, messageProcessor) {
    if (name) {
      this.#name = name
    }

    this.#logger = log4js.getLogger(this.#name)

    if (typeof messageProcessor === 'function') {
      this.#messageProcessor = messageProcessor
    }

    this.#queue = process.env.RABBITMQ_QUEUE
    this.#rabbitUrl = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
  }

  async start() {
    dotenv.config()
    await this.connect()
  }

  /**
   * Start listening for messages
   *
   * @param {*} [queueOptions={}]
   * @memberof Consumer
   */
  async consume(queueOptions = {}) {
    this.#channel = await this.#conn.createChannel()
    this.#channel.assertQueue(this.#queue, {
      durable: true,
      ...queueOptions,
    })
    this.#channel.consume(
      this.#queue,
      async (msg) => {
        if (msg.content) {
          const msgJsonStr = JSON.parse(msg.content.toString())
          try {
            await this.#messageProcessor(msgJsonStr)
          } finally {
            // We always ack the message, even in the event of errors. There's too
            // many records to DLQ them.
            this.#channel.ack(msg)
          }
        }
      },
      {
        noAck: false,
      }
    )
  }

  async connect(attempt = 0) {
    this.#isReconnecting = false

    const reconnectionHandler = async (err) => {
      if (this.#isReconnecting) {
        return
      }
      this.#isReconnecting = true
      this.#logger.error('connection error ... reconnecting', err)
      const backOff = this.#nextExponentialTimeout(attempt)
      setTimeout(() => {
        this.connect(attempt + 1)
      }, backOff)
    }

    try {
      this.#conn = await amqp.connect(this.#rabbitUrl)
      this.#conn.on('error', reconnectionHandler)
      this.#conn.on('close', reconnectionHandler)
    } catch (error) {
      reconnectionHandler(error)
    }
  }

  #nextExponentialTimeout(retries) {
    const timeout = Math.pow(2, retries) * 1000 + Math.random() * 1000
    return timeout
  }
}
