export type Move = {
  row: number
  col: number
  player: string
}

export type GameLog = {
  id: string
  size?: number
  date: string
  outcome: string
  moves: Move[]
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
  moves: Move[]
  outcome: string
}
