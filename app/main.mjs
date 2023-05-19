import express from 'express'
import bodyParser from 'body-parser'
import sendMessage from '../src/message/sendMessage.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 80

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/post', async (req, res) => {
  const message = { ...req.body }
  await sendMessage(process.env.RABBITMQ_SPOT_QUEUE, req.body)
  console.log('Posted message sent', message)
  res.send('1 spot(s) added')
})

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`)
})
