import express, { Request, Response } from 'express'
import validateSchema from '../middleware/validateSchema'
import { deserializeUser } from '../middleware/deserializeUser'
import {
  createGame,
  updateGame,
  getGameById,
  getAllGamesByUserId,
  deleteGame,
} from '../service/game.service'
import {
  createGameSchema,
  deleteGameSchema,
  getGameByIdSchema,
  updateGameSchema,
} from '../schema/game.schema'
import { checkWin, checkDraw } from '../util/gameLogic'
import { formatDate } from '../util/dateFormat'
import { State, Stone } from '../model/game.model'

const gameHandler = express.Router()
gameHandler.use(deserializeUser)

gameHandler.get('/game-history', async (req: Request, res: Response) => {
  const userId = req.userId
  const games = await getAllGamesByUserId(userId)

  if (games) {
    return res.status(200).send(
      games.map((game) => ({
        id: game._id,
        outcome: game.state,
        date: formatDate(game.createdAt),
      }))
    )
  } else {
    return res.status(404).send({ message: 'No games found' })
  }
})

gameHandler.get(
  '/:id',
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id
    const game = await getGameById(gameId)

    if (game) {
      return res.status(200).send({
        size: game.boardSize,
        moves: game.moveList,
        outcome: game.state,
      })
    } else {
      return res.status(404).send({ message: 'Game not found' })
    }
  }
)

gameHandler.post(
  '/',
  validateSchema(createGameSchema),
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId
      const { boardSize } = req.body

      const newGame = await createGame({ userId, boardSize })
      return res.status(200).send({ gameId: newGame._id })
    } catch (e) {
      return res.status(500).send(e)
    }
  }
)

gameHandler.delete(
  '/:id',
  validateSchema(deleteGameSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id
    const userId = req.userId
    await deleteGame(gameId, userId)
    return res.sendStatus(200)
  }
)

gameHandler.put(
  '/:id',
  validateSchema(updateGameSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id
    const userId = req.userId
    const { player, board, moveList } = req.body

    let response = State.IN_PROGRESS

    if (checkWin(player, board)) {
      response = player === Stone.BLACK ? State.BLACK_WIN : State.WHITE_WIN
    } else if (checkDraw(board)) {
      response = State.DRAW
    }
    // if game is over, update game state
    if (response !== State.IN_PROGRESS) {
      const updatedGame = await updateGame(gameId, userId, {
        state: response,
        moveList,
      })
      if (updatedGame) {
        return res.status(200).send({ state: response })
      } else {
        return res.status(500).send('Error updating game')
      }
    } else {
      return res.status(200).send({ state: response })
    }
  }
)

export default gameHandler
