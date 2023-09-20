import mongoose, { Document } from 'mongoose'
import { UserDocument } from './user.model'

export enum Stone {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  EMPTY = 'EMPTY',
}

export enum State {
  IN_PROGRESS = 'IN_PROGRESS',
  BLACK_WIN = 'BLACK_WIN',
  WHITE_WIN = 'WHITE_WIN',
  DRAW = 'DRAW',
}

export interface MoveList {
  row: number
  col: number
  player: string
}

export interface GameDocument extends Document {
  userId: UserDocument['_id']
  moveList?: MoveList[]
  boardSize: number
  state?: State
  createdAt: Date
}

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moveList: { type: Array },
  boardSize: {
    type: Number,
    required: true,
  },
  state: { type: String, default: State.IN_PROGRESS },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<GameDocument>('Game', gameSchema)
