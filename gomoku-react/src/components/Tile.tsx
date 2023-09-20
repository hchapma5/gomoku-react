import { memo } from 'react'
import { GameState, Stone } from '../constants'
import { useGameStore } from '../stores'
import { MoveList } from '../types'

import style from './styles/Tile.module.css'

type TileProps = {
  row: number
  col: number
  status: Stone
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

export default memo(function Tile({ row, col, status, moves }: TileProps) {
  const { gameState, setAtIndex } = useGameStore()

  let label: number | undefined

  const clickHandler = () => {
    if (gameState === GameState.IN_PROGRESS && status === Stone.EMPTY) {
      setAtIndex(row, col)
    }
  }

  return (
    <div className={getClassNames(status)} onClick={clickHandler}>
      {moves && <div className={style.label}>{label}</div>}
    </div>
  )
})