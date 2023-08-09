import { Tile } from '../components'
import { useGameStore } from '../context'

import style from './Board.module.css'

export default function Board() {
  const { boardSize, stones } = useGameStore()

  const test = stones.map((row, index) =>
    row.map((state, pos) => <Tile row={index} col={pos} status={state} />)
  )

  return (
    <div
      className={style.board}
      style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
    >
      {test}
    </div>
  )
}
