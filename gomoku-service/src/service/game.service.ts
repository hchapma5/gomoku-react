import mongoose, { DocumentDefinition } from 'mongoose'
import GameModel, { GameDocument } from '../model/game.model'

export async function getAllGamesByUserId(userId: string) {
  return GameModel.find({ userId: userId }).lean()
}

export async function getGameById(id: string) {
  return GameModel.findOne({ _id: new mongoose.Types.ObjectId(id) }).lean()
}

export async function createGame(game: DocumentDefinition<GameDocument>) {
  return GameModel.create(game)
}

export async function updateGame(
  id: string,
  userId: string,
  input: DocumentDefinition<GameDocument>
) {
  return GameModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userId),
    },
    input,
    { new: true }
  )
}
