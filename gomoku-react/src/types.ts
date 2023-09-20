export type MoveList = {
  row: number
  col: number
  player: string
}

export type GameLog = {
  id?: number
  size?: number
  date: string
  result: string
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
