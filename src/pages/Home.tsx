import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '../components'
import { GOMOKU_BOARD_SIZE } from '../constants'
import { UserContext } from '../context'

import style from './Home.module.css'

export default function Home() {
  const { user, boardSize, selectSize } = useContext(UserContext)
  const navigate = useNavigate()

  const message = 'Choose board size'

  const handleStart = () => {
    user ? navigate('/game') : navigate('/login')
  }

  return (
    <div className={style.container}>
      <Dropdown
        minValue={GOMOKU_BOARD_SIZE.MIN}
        maxValue={GOMOKU_BOARD_SIZE.MAX}
        label={message}
        setValue={selectSize}
        value={boardSize}
      />
      <Button type='submit' onClick={handleStart}>
        Start
      </Button>
    </div>
  )
}
