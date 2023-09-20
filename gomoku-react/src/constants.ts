export enum Stone {
  EMPTY = 'EMPTY',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
}

export enum GOMOKU_BOARD_SIZE {
  MIN = 5,
  MAX = 19,
}

export enum GameState {
  IN_PROGRESS = 'IN_PROGRESS',
  BLACK_WIN = 'BLACK_WIN',
  WHITE_WIN = 'WHITE_WIN',
  DRAW = 'DRAW',
  IDLE = 'IDLE',
}
