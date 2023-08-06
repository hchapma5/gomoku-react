import { Row } from '../components'

import style from './Board.module.css'

type BoardProps = {
  size: number
}

export default function Board({ size }: BoardProps) {
  return (
    <div
      className={style.board}
      // style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {[...Array(size)].map((_, index) => (
        <Row id={index} size={size} />
      ))}
    </div>
  )
}
