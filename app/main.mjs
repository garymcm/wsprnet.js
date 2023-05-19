import express from 'express'
import bodyParser from 'body-parser'

// import sendMessage from '../src/message/sendMessage'

const app = express()
const port = 80

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})

app.post('/post', (req, res) => {
  const message = { ...req.body }
  //sendMessage('status', message)

  console.log('Post', message)
  res.send('1 spot(s) added')
})

app.get('/post', (req, res) => {
  const message = { ...req.body }
  //sendMessage('status', message)

  console.log('Get', message)
  res.send('1 spot(s) added')
})

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`)
})
