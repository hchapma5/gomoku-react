import { TILE_STATUS, PLAYER, GAME_STATE } from '../constants'
import { useGameStore } from '../context'
import { MoveList } from '../types'
import style from './Tile.module.css'

type TileProps = {
  row: number
  col: number
  status: TILE_STATUS
  moves?: MoveList[]
}

const getClassNames = (status: TILE_STATUS) => {
  const className = style.tile
  switch (status) {
    case TILE_STATUS.EMPTY:
      return `${className} ${style.available}`
    case TILE_STATUS.BLACK:
      return `${className} ${style.black}`
    case TILE_STATUS.WHITE:
      return `${className} ${style.white}`
    default:
      return className
  }
}

export default function Tile({ row, col, status, moves }: TileProps) {
  const { player, gameState, setAtIndex, handleTurn } = useGameStore()

  let label: number | undefined

  if (moves) {
    label =
      moves.findIndex((move) => move.row === row && move.col === col) + 1 > 0
        ? moves.findIndex((move) => move.row === row && move.col === col) + 1
        : undefined
  }

  const clickHandler = () => {
    if (gameState === GAME_STATE.PLAYING && status === TILE_STATUS.EMPTY) {
      if (player === PLAYER.BLACK) {
        setAtIndex(row, col, TILE_STATUS.BLACK)
      } else {
        setAtIndex(row, col, TILE_STATUS.WHITE)
      }
      handleTurn(row, col)
    }
  }

  return (
    <div className={getClassNames(status)} onClick={clickHandler}>
      {moves && <div className={style.label}>{label}</div>}
    </div>
  )
}
