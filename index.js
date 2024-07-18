const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

const db = require('./models')
db.sequelize.sync()

app.use(
  cors({
    origin: 'http://example.com',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})
