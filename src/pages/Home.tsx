import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '../components'
import { GAME_STATE, GOMOKU_BOARD_SIZE } from '../constants'
import { UserContext } from '../context'
import { useGameStore } from '../stores'

import style from './Home.module.css'

export default function Home() {
  const { user } = useContext(UserContext)
  const {
    gameState,
    boardSize,
    setBoardSize,
    initializeGame: initGame,
  } = useGameStore()
  const navigate = useNavigate()

  const activeGame = gameState === GAME_STATE.PLAYING ? true : false

  const handleClick = () => {
    if (user) {
      if (boardSize === undefined) return
      if (gameState !== GAME_STATE.PLAYING) initGame()
      navigate('/game')
    } else {
      navigate('/login')
    }
  }

  const handleDropdown = (value: number) => {
    if (user) setBoardSize(value)
  }

  return (
    <div className={style.container}>
      <Dropdown
        minValue={GOMOKU_BOARD_SIZE.MIN}
        maxValue={GOMOKU_BOARD_SIZE.MAX}
        setValue={handleDropdown}
        label={'Choose a board size' + (boardSize ? ` (${boardSize})` : '')}
        active={activeGame}
      />
      <Button type='submit' onClick={handleClick}>
        {gameState === GAME_STATE.PLAYING ? 'Resume' : 'Start'}
      </Button>
    </div>
  )
}
