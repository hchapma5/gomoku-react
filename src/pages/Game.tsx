import Board from '../components/Board'

import style from './Game.module.css'

export default function Game() {
  return (
    <div className={style.container}>
      <Board />
    </div>
  )
}
