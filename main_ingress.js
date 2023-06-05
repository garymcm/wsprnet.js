import express from 'express'
import bodyParser from 'body-parser'
import fileupload from 'express-fileupload'

import sendMessage from './src/message/sendMessage.js'
import * as dotenv from 'dotenv'
import log4js from './src/logging/index.js'
import morgan from 'morgan'

const logger = log4js.getLogger('main_ingress')
dotenv.config()

process.env.RABBITMQ_URL = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`

const app = express()
app.use(morgan('combined'))

const port = process.env.APP_LISTEN_PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))
// TODO we should parameterize the file size limit
app.use(
  fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/post', async (req, res) => {
  const message = { ...req.body }

  // Upload from wsjt-x does not include the function name
  if (!message.function && message.call) {
    message.function = 'upload'
  }

  if (!message.function) {
    res.send('Unrecongized wsprnet function')
    return
  }

  // curl -m 300 -F allmept=@${UPLOADS_TMP_WSPRNET_SPOTS_TXT_FILE} -F decoder_sw_version=${WD_VERSION} -F call=${call} -F grid=${grid} http://localhost:5000/meptspots.php
  // curl -m 300 -F "allmept=@./misc/wsprdaemon.txt" -F call="W1GJM" -F grid="FN42di"  http:///localhost:5000/meptspots.php

  if (message.function === 'upload' && req.files) {
    message.file = req.files.file
  }

  const queue = getQueue(message.function)
  if (!queue) {
    res.send(
      `Invalid function: ${message.function}. Allowed values: wspr, wsprstat`
    )
    return
  }
  await sendMessage(queue, req.body)

  // must contains the string 'spots(s) added' as a signal to wsjt-x that the
  // message was received
  res.send('1 spot(s) added')
})

app.post('/meptspots.php', async (req, res) => {
  const queue = getQueue('upload')
  logger.info('meptspots.php uploading to %s', queue)

  const data = req.files.allmept
  if (data.truncated) {
    res.statusCode = 413
    return res.send('File too large')
  }

  const message = { ...req.body }
  logger.info('heres the message: %s', message)

  await sendMessage(queue, { ...message, file: data })
  logger.info('File processed', data)
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
    case 'upload':
      return process.env.RABBITMQ_UPLOAD_QUEUE
    default:
      break
  }
}
