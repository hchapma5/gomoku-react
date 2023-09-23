import { create } from 'zustand'
import { Post, Del, Put } from '../utils/http'
import { Move } from '../types'
import { GameState, Stone } from '../constants'

interface CreateResponse {
  gameId: string
}

interface MoveResponse {
  state: GameState
}

type State = {
  boardSize: number | undefined
  player?: Stone
  stones: Stone[][]
  gameState: GameState
  gameId?: string
  moves: Move[]
  setAtIndex: (row: number, col: number) => void
  createGame: (size: number) => Promise<true | string>
  processTurn: () => Promise<true | string>
  resetGame: () => void
  endGame: () => void
  setGameId: (gameId: string) => void
  setBoardSize: (size: number) => void
  deleteGame: () => Promise<void>
}

const useGameStore = create<State>()((set, get) => ({
  boardSize: undefined,
  player: Stone.BLACK,
  stones: [],
  gameState: GameState.IDLE,
  gameId: undefined,
  moves: [],

  createGame: async (size: number) => {
    try {
      const response = (await Post(`/api/game`, {
        boardSize: size,
      })) as CreateResponse
      set({
        gameId: response.gameId,
        gameState: GameState.IN_PROGRESS,
        boardSize: size,
        stones: [...Array(size)].map(() => Array(size).fill(Stone.EMPTY)),
      })
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to create game at this moment, please try again'
    }
  },
  processTurn: async () => {
    try {
      set({ gameState: GameState.IDLE }) // Set Idle while processing
      const id = get().gameId
      const turn = get().moves.slice(-1)[0]
      const response = (await Put(`/api/game/${id}`, {
        player: turn.player,
        row: turn.row,
        col: turn.col,
      })) as MoveResponse
      if (response.state !== GameState.IN_PROGRESS) {
        // Case: WIN or DRAW
        set({ gameState: response.state })
      } else {
        // Continue game with next player
        set({
          gameState: GameState.IN_PROGRESS,
          player: get().player === Stone.BLACK ? Stone.WHITE : Stone.BLACK,
        })
      }
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to make move at this moment, please try again'
    }
  },

  setGameId: (gameId) => set(() => ({ gameId })),
  setBoardSize: (size: number) => set({ boardSize: size }),

  resetGame: () =>
    set({
      stones: [...Array(get().boardSize)].map(() =>
        Array(get().boardSize).fill(Stone.EMPTY)
      ),
      moves: [],
      player: Stone.BLACK,
      gameState: GameState.IN_PROGRESS,
    }),

  endGame: () =>
    set(() => ({ gameState: GameState.IDLE, boardSize: undefined })),

  deleteGame: async () => {
    await Del(`/api/game/${get().gameId}`)
  },

  setAtIndex: async (row: number, col: number) => {
    set((state) => {
      const newStones = [...state.stones]
      newStones[row][col] = state.player as Stone
      const newMoves = [...state.moves]
      newMoves.push({ row, col, player: state.player as Stone })
      return { stones: newStones, moves: newMoves }
    })
    get().processTurn()
  },
}))

export default useGameStore
