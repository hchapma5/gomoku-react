import { PLAYER, TILE_STATUS, GOMOKU_BOARD_SIZE } from './../constants'
import { create } from 'zustand'

type State = {
  boardSize: number
  player: PLAYER
  stones: TILE_STATUS[][]
  setBoardSize: (boardSize: number) => void
  setPlayer: (player: PLAYER) => void
  initGame: () => void
  setAtIndex: (row: number, col: number, value: TILE_STATUS) => void
}

const useGameStore = create<State>((set) => ({
  boardSize: GOMOKU_BOARD_SIZE.DEFAULT,
  player: PLAYER.BLACK,
  stones: [],
  initGame: () =>
    set((state) => {
      const initStones = [...Array(state.boardSize)].map(() =>
        Array(state.boardSize).fill(TILE_STATUS.EMPTY)
      )
      return { stones: initStones, player: PLAYER.BLACK }
    }),
  setBoardSize: (boardSize) => set(() => ({ boardSize })),
  setPlayer: (player) => set(() => ({ player })),
  setAtIndex: (row, col, value) =>
    set((state) => {
      const newStones = [...state.stones]
      newStones[row][col] = value
      return { stones: newStones }
    }),
}))

export default useGameStore
