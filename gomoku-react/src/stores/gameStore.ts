import { create } from 'zustand'
import { Post, Del, Put } from '../utils/http'
import { MoveList } from '../types'
import { GameState, Stone } from '../constants'

interface CreateResponse {
  gameId: string
}

interface MoveResponse {
  state: GameState
  moveList: MoveList[]
}

type State = {
  boardSize: number | undefined
  player?: Stone
  stones: Stone[][]
  gameState: GameState
  gameId?: string
  moveList: MoveList[]
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
  moveList: [],

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
      const id = get().gameId
      const response = (await Put(`/api/game/${id}`, {
        player: get().player,
        board: get().stones,
        moveList: get().moveList,
      })) as MoveResponse
      if (response.state !== GameState.IN_PROGRESS) {
        // Case: WIN or DRAW
        set({ gameState: response.state })
      } else {
        // Switch player
        set({
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
      moveList: [],
      player: Stone.BLACK,
      gameState: GameState.IN_PROGRESS,
    }),

  endGame: () =>
    set(() => ({ gameState: GameState.IDLE, boardSize: undefined })),

  deleteGame: async () => {
    await Del(`/api/game/${get().gameId}`)
  },

  setAtIndex: (row, col) => {
    set((state) => {
      const newStones = [...state.stones]
      newStones[row][col] = state.player as Stone
      const newMoveList = [...state.moveList]
      newMoveList.push({ row, col, player: state.player as Stone })
      return { stones: newStones, moveList: newMoveList }
    })
    get().processTurn()
  },
}))

export default useGameStore
