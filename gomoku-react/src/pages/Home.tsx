import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '../components'
import { GOMOKU_BOARD_SIZE, GameState } from '../constants'
import { useGameStore, useUserStore } from '../stores'

import style from './styles/Home.module.css'

export default function Home() {
  const { user } = useUserStore()
  const { createGame, gameState, boardSize, setBoardSize } = useGameStore()
  const navigate = useNavigate()

  const activeGame = gameState === GameState.IN_PROGRESS ? true : false

  const handleClick = () => {
    if (user) {
      if (!boardSize) return
      if (!activeGame) createGame(boardSize)
      navigate('game')
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
        {gameState === 'IN_PROGRESS' ? 'Resume' : 'Start'}
      </Button>
    </div>
  )
}
