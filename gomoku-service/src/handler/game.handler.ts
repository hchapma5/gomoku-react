import express, { Request, Response } from 'express'
import validateSchema from '../middleware/validateSchema'
import { deserializeUser } from '../middleware/deserializeUser'
import {
  createGame,
  updateGame,
  getGameById,
  getAllGamesByUserId,
} from '../service/game.service'
import {
  createGameSchema,
  getGameByIdSchema,
  updateGameSchema,
} from '../schema/game.schema'
import { checkWin, checkDraw } from '../util/gameLogic'

const gameHandler = express.Router()
gameHandler.use(deserializeUser)

gameHandler.get('/game-history', async (req: Request, res: Response) => {
  const userId = req.userId
  try {
    const games = await getAllGamesByUserId(userId)
    return res.status(200).send(
      games.map((game) => ({
        id: game._id,
        outcome: game.outcome,
        date: game.createdAt,
      }))
    )
  } catch (error) {
    return res.status(500).send(error)
  }
})

gameHandler.get(
  '/:id',
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id
    console.log(gameId)
    const game = await getGameById(gameId)
    if (!game) return res.sendStatus(404)
    return res.status(200).send(game)
  }
)

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
        const gameOutcome = checkWin(stone, game.board)
          ? 'win'
          : checkDraw(game.board)
          ? 'draw'
          : 'continue'

        return res.status(200).send({ result: gameOutcome })
      } else {
        return res.status(500).send('Error updating game')
      }
    } else {
      return res.status(400).send('Invalid move')
    }
  }
)

export default gameHandler
