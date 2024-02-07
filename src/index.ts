import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from '~/routes/index'

dotenv.config()
const app = express()

const URI = process.env.URI as string

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Failed to connect to database')
  })

app.use(express.json())
app.use(cors())
app.use(router)

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
