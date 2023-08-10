import { MoveList } from './MoveList'

export type GameLog = {
  id?: number
  size: number | undefined
  date: string
  result: string
  moveList: MoveList[]
}
