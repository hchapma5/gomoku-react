import Tile from './Tile'

import style from './Row.module.css'

type RowProps = {
  id: number
  size: number
}

export default function Row({ id, size }: RowProps) {
  return (
    <div className={style.row}>
      {[...Array(size)].map((_, index) => (
        <Tile key={`tile-${id}-${index}`} id={index} />
      ))}
    </div>
  )
}
