import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../util/connectDB'

dotenv.config()

connectDB()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

mongoose.connection.once('connected', () => {
  console.log('Connected to MongoDB.')

  app.listen(port, () => {
    console.log(` [Server]: is running at http://localhost:${port}`)
  })
})
