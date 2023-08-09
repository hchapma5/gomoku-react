import { TILE_STATUS } from '../constants'
import { MoveList } from './MoveList'

export type GameLog = {
  id?: number
  size: number | undefined //Fix this later
  date: string
  result: string
  moveList: MoveList[]
}
