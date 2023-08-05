import Tile from '../components/Tile'

import style from './Board.module.css'

const SIZE = 15

export default function Board() {
  return (
    <div
      className={style.board}
      style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
    >
      {[...Array(SIZE * SIZE)].map((_, index) => (
        <Tile key={`tile-${index}`} id={index} />
      ))}
    </div>
  )
}
