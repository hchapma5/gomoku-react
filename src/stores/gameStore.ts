import { create } from 'zustand'
import { MoveList } from '../types'
import { checkWin, checkDraw } from '../utils/GameLogic'
import { PLAYER, TILE_STATUS, GAME_STATE } from '../constants'

type State = {
  boardSize?: number
  player: PLAYER
  stones: TILE_STATUS[][]
  moveList: MoveList[]
  gameState: GAME_STATE
  gameId?: number
  initializeGame: () => void
  setBoardSize: (boardSize: number) => void
  placeStoneOnBoard: (row: number, col: number, value: TILE_STATUS) => void
  makeMove: (row: number, col: number) => void
  endGame: () => void
  setGameId: (gameId: number) => void
}

const useGameStore = create<State>()((set) => ({
  boardSize: undefined,
  player: PLAYER.BLACK,
  stones: [],
  moveList: [],
  gameState: GAME_STATE.IDLE,
  gameId: undefined,

  initializeGame: () =>
    set((state) => {
      const initStones = [...Array(state.boardSize)].map(() =>
        Array(state.boardSize).fill(TILE_STATUS.EMPTY)
      )
      return {
        stones: initStones,
        player: PLAYER.BLACK,
        gameState: GAME_STATE.PLAYING,
        moveList: [],
      }
    }),

  setBoardSize: (boardSize) => set(() => ({ boardSize })),

  setGameId: (gameId) => set(() => ({ gameId })),

  endGame: () =>
    set(() => ({ gameState: GAME_STATE.IDLE, boardSize: undefined })),

  placeStoneOnBoard: (row, col, value) =>
    set((state) => {
      const newStones = [...state.stones]
      newStones[row][col] = value
      return { stones: newStones }
    }),

  makeMove: (row: number, col: number) =>
    set((state) => {
      const entry: MoveList = { row, col, player: state.player }
      const updateMoveList = [...state.moveList, entry]
      if (checkWin(state.player, state.stones)) {
        return { moveList: updateMoveList, gameState: GAME_STATE.WIN }
      } else if (checkDraw(state.stones)) {
        return { moveList: updateMoveList, gameState: GAME_STATE.DRAW }
      } else {
        const newPlayer =
          state.player === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK
        return { moveList: updateMoveList, player: newPlayer }
      }
    }),
}))

export default useGameStore
