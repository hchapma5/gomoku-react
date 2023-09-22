import { Tile } from '../components'
import { Stone } from '../constants'
import { MoveList } from '../types'

import style from './styles/Board.module.css'

type BoardProps = {
  size?: number
  state: Stone[][]
  moves?: MoveList[]
  handler: () => void
}

export default function Board({ size, state, moves, handler }: BoardProps) {
  const board = state.map((row, index) =>
    row.map((state, pos) => (
      <Tile
        row={index}
        col={pos}
        status={state}
        handler={handler}
        moves={moves ? moves : undefined}
      />
    ))
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
