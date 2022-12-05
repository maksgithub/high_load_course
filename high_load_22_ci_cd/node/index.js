const express = require('express')
const app = express()
const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
  res.send('Hello World_6!!')
})

app.get('/test', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})