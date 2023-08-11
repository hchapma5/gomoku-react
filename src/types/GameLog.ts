import { MoveList } from './MoveList'

export type GameLog = {
  id?: number
  size?: number
  date: string
  result: string
  moveList: MoveList[]
}
