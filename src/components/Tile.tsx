import { useState } from 'react'
import { TILE_STATUS } from '../constants'

import style from './Tile.module.css'

type TileProps = {
  id: number
  isOccupied?: boolean
}

const getClassNames = (status: TILE_STATUS) => {
  const className = style.tile
  switch (status) {
    case TILE_STATUS.AVAILABLE:
      return `${className} ${style.available}`
    case TILE_STATUS.OCCUPIED:
      return `${className} ${style.occupied}`
    default:
      return className
  }
}

export default function Tile(props: TileProps) {
  const { id, isOccupied = false } = props
  const [status, setStatus] = useState(
    isOccupied ? TILE_STATUS.OCCUPIED : TILE_STATUS.AVAILABLE
  )

  const handleClick = () => {
    if (status === TILE_STATUS.AVAILABLE) {
      setStatus(TILE_STATUS.OCCUPIED)
    } else if (status === TILE_STATUS.OCCUPIED) {
      setStatus(TILE_STATUS.AVAILABLE)
    }
  }

  return <div className={getClassNames(status)} onClick={handleClick} />
}
