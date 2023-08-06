import { useContext } from 'react'
import { UserContext } from '../context'
import { Board, Button } from '../components'

import style from './Game.module.css'

export default function Game() {
  const { boardSize } = useContext(UserContext)
  return (
    <div className={style.container}>
      <label>Game status</label>
      <Board size={boardSize} />
      <div className={style.buttons}>
        <Button type='submit'>Reset</Button>
        <Button type='submit'>Leave</Button>
      </div>
    </div>
  )
}
