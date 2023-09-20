import { useGameStore, useUserStore } from '../stores'
import { Board, Button, GameLabel } from '../components'
import { GameState } from '../constants'
import { Navigate, useNavigate } from 'react-router-dom'

import style from './styles/Game.module.css'

export default function Game() {
  const { user } = useUserStore()
  const {
    player,
    gameState,
    stones,
    boardSize,
    resetGame,
    endGame,
    deleteGame,
  } = useGameStore()

  const navigate = useNavigate()

  const getMessage = (state: GameState) => {
    const message = `Current Player: ${player}`
    switch (state) {
      case GameState.BLACK_WIN:
        return 'Black Wins!'
      case GameState.WHITE_WIN:
        return 'White Wins!'
      case GameState.DRAW:
        return "It's a Draw"
      default:
        return message
    }
  }

  const isGameOver = gameState !== GameState.IN_PROGRESS ? true : false

  const handleLeave = () => {
    endGame()
    if (gameState === GameState.IN_PROGRESS) {
      deleteGame()
      navigate('/')
    } else {
      navigate('/game-history')
    }
  }

  const handleReset = () => {
    resetGame()
  }

  if (!user) return <Navigate to='/login' />
  return (
    <div className={style.container}>
      <GameLabel label={getMessage(gameState)} />
      <Board size={boardSize} state={stones} />
      <div className={style.buttons}>
        <Button type='submit' onClick={handleReset} disabled={isGameOver}>
          Reset
        </Button>
        <Button type='submit' onClick={handleLeave}>
          Leave
        </Button>
      </div>
    </div>
  )
}
