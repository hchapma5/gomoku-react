import express, { Request, Response } from 'express'
import validateSchema from '../middleware/validateSchema'
import { deserializeUser } from '../middleware/deserializeUser'
import {
  createGame,
  updateGame,
  getGameById,
  getGamesbyUserId,
} from '../service/game.service'
import { createGameSchema, updateGameSchema } from '../schema/game.schema'
import mongoose from 'mongoose'

const gameHandler = express.Router()
gameHandler.use(deserializeUser)

gameHandler.post(
  '/',
  validateSchema(createGameSchema),
  async (req: Request, res: Response) => {
    const userId = req.userId
    const { boardSize } = req.body

    const board = [...Array(boardSize)].map(() => Array(boardSize).fill(''))

    // Create game
    const newGame = await createGame({ userId, board })
    return res.status(200).send({ gameId: newGame._id })
  }
)

gameHandler.put(
  '/:id',
  validateSchema(updateGameSchema),
  async (req: Request, res: Response) => {
    const userId = req.userId
    const gameId = req.params.id
    console.log(gameId)

    const { row, col, stone } = req.body

    // Get game
    const game = await getGameById(gameId)

    if (!game) {
      return res.status(404).send('Game not found')
    }

    // Update game
    if (game.board[row][col] === '') {
      game.board[row][col] = stone

      const updatedGame = await updateGame(gameId, userId, {
        board: game.board,
      })
      if (updatedGame) {
        return res.status(200).send(updatedGame)
      } else {
        return res.status(500).send('Error updating game')
      }
    } else {
      return res.status(400).send('Invalid move')
    }
  }
)

export default gameHandler
