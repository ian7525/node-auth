import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import dbConfig from './config/db.config.js'

import { dbInit } from './models/index.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

const app = express()

dotenv.config()

dbInit(dbConfig())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRoute)
app.use('/user', userRoute)

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'OK' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`)
})
