import { Tile } from '../components'

import style from './Board.module.css'

type BoardProps = {
  size: number
}

export default function Board({ size }: BoardProps) {
  const board = [...Array(size)].map((_, row) =>
    [...Array(size)].map((_, col) => <Tile row={row} col={col} />)
  )

  return (
    <div
      className={style.board}
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {board}
    </div>
  )
}
