import { Tile } from '../components'
import { Stone } from '../constants'
import { Move } from '../../../gomoku-react/src/types'

type BoardProps = {
  size?: number
  state: Stone[][]
  moves?: Move[]
}

export default function Board({ size, state, moves }: BoardProps) {
  const board = state.map((row, index) =>
    row.map((state, pos) => (
      <Tile
        key={`${index}-${pos}`}
        row={index}
        col={pos}
        status={state}
        moves={moves ? moves : undefined}
      />
    ))
  )

  return (
    <div
      className="grid w-96 h-96 bg-yellow-800 border-2 border-gray-800"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`}}
    >
      {board}
    </div>
  )
}
