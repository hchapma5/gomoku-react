import { useEffect, useState } from 'react'
import { TILE_STATUS, PLAYER } from '../constants'
import { useGameStore } from '../context'
import style from './Tile.module.css'

type TileProps = {
  row: number
  col: number
  status?: TILE_STATUS
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

export default function Tile({ row, col }: TileProps) {
  const [state, setState] = useState(TILE_STATUS.EMPTY)
  const { player, setAtIndex } = useGameStore()

  const clickHandler = () => {
    if (state === TILE_STATUS.EMPTY) {
      if (player === PLAYER.BLACK) {
        setState(TILE_STATUS.BLACK)
      } else {
        setState(TILE_STATUS.WHITE)
      }
    }
  }

  useEffect(() => {
    setAtIndex(row, col, state)
  }, [state])

  return (
    <div className={getClassNames(state)} onClick={clickHandler}>
      <p>
        {row} {col}`
      </p>
    </div>
  )
}
