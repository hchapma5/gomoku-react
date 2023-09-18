import mongoose, { Document } from 'mongoose'
import { UserDocument } from './user.model'

export interface GameDocument extends Document {
  userId: UserDocument['_id']
  board: string[][]
  outcome?: string
  createdAt?: Date
}

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  board: { type: Array },
  outcome: { type: String },
})

export default mongoose.model<GameDocument>('Game', gameSchema)
