import { useGameStore, useUserStore } from '../stores'
import { Board } from '../components'
import { GameState } from '../constants'
import { Navigate, useNavigate } from 'react-router-dom'

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
      case GameState.IDLE:
        return 'Processing...'
      default:
        return message
    }
  }

  const isGameOver =
    gameState !== GameState.IDLE && gameState !== GameState.IN_PROGRESS
      ? true
      : false

  const handleLeave = () => {
    if (
      !isGameOver &&
      !window.confirm('Are you sure you want to leave the game?')
    )
      return
    endGame()
    if (gameState === GameState.IN_PROGRESS) {
      deleteGame()
      navigate('/')
    } else {
      navigate('/game-history')
    }
  }

  const handleReset = () => {
    if (!window.confirm('Are you sure you want to reset the game?')) return
    resetGame()
  }

  if (!user) return <Navigate to='/login' />
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="text-2xl font-bold" >{getMessage(gameState)}</label>
      <Board size={boardSize} state={stones} />
      <div className="flex w-96 justify-between">
        <button className="btn btn-bordered btn-primary" type='submit' onClick={handleReset} disabled={isGameOver}>
          Reset
        </button>
        <button className="btn btn-bordered btn-primary" type='submit' onClick={handleLeave}>
          Leave
        </button>
      </div>
    </div>
  )
}
