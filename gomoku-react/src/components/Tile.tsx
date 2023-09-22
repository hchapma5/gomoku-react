import { memo } from 'react'
import { GameState, Stone } from '../constants'
import { useGameStore } from '../stores'
import { MoveList } from '../types'

import style from './styles/Tile.module.css'

type TileProps = {
  row: number
  col: number
  status: Stone
  handler?: () => void
  moves?: MoveList[]
}

const getClassNames = (status: Stone) => {
  const className = style.tile
  switch (status) {
    case Stone.BLACK:
      return `${className} ${style.black}`
    case Stone.WHITE:
      return `${className} ${style.white}`
    default:
      return className
  }
}

export default memo(function Tile({
  row,
  col,
  status,
  handler,
  moves,
}: TileProps) {
  let label: number | undefined

  if (moves) {
    label =
      moves.findIndex((move) => move.row === row && move.col === col) + 1 > 0
        ? moves.findIndex((move) => move.row === row && move.col === col) + 1
        : undefined
  }

  return (
    <div className={getClassNames(status)} onClick={handler}>
      {moves && <div className={style.label}>{label}</div>}
    </div>
  )
})
