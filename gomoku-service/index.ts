import dotenv from 'dotenv'
import mongoose from 'mongoose'

import connectDB from './src/util/connectDB'
import app from './src/app'

dotenv.config()
const port = process.env.PORT

connectDB()

mongoose.connection.once('connected', () => {
  console.log('Connected to database')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
