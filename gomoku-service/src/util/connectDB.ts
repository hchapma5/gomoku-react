import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || ''
  console.log(' [server]: Connecting to DB...')
  try {
    await mongoose.connect(uri)
  } catch (e) {
    console.log(' [server]: Error connecting to DB: ')
    console.log(e)
    process.exit(1)
  }
}

export default connectDB
