import express from 'express'
import bodyParser from 'body-parser'
import sendMessage from '../message/sendMessage.js'
import * as dotenv from 'dotenv'
import log4js from '../logging/index.js'

const logger = log4js.getLogger('main')
dotenv.config()

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/post', async (req, res) => {
  const message = { ...req.body }

  if (!message.function) {
    res.send('The value `function` is missing from the request body')
    return
  }

  const queue = getQueue(message.function)
  if (!queue) {
    res.send(
      `Invalid function: ${message.function}. Allowed values: wspr, wsprstat`
    )
    return
  }
  await sendMessage(queue, req.body)
  // must contains the string 'sports(s) added' as a signal to wsjt-x that the
  // message was received
  res.send('1 spot(s) added')
})

app.listen(port, () => {
  logger.info(`Success! Your application is running on port ${port}.`)
})

function getQueue(wsprFn) {
  switch (wsprFn) {
    case 'wspr':
      return process.env.RABBITMQ_SPOT_QUEUE
    case 'wsprstat':
      return process.env.RABBITMQ_STATUS_QUEUE
    default:
      break
  }
}
