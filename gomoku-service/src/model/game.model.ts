import mongoose, { Document } from 'mongoose'
import { UserDocument } from './user.model'
import Move from '../types'
import { GameState } from '../constants'

export interface GameDocument extends Document {
  userId: UserDocument['_id']
  moveList: Move[]
  boardSize: number
  state?: GameState
  createdAt: Date
}

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moveList: { type: Array, default: [] },
  boardSize: {
    type: Number,
    required: true,
  },
  state: { type: String, default: GameState.IN_PROGRESS },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<GameDocument>('Game', gameSchema)
