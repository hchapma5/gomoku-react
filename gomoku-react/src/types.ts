export type MoveList = {
  row: number
  col: number
  player: string
}

export type GameLog = {
  id: string
  size?: number
  date: string
  outcome: string
  moveList: MoveList[]
}

export type User = {
  _id: string
  token: string
}

export type Credential = {
  username: string
  password: string
}

export type GameData = {
  size: number
  moves: MoveList[]
  outcome: string
}
