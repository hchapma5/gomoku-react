import { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useGameStore, useUserStore } from '../stores'
import { Board, Button, GameLabel } from '../components'
import { GameState, Stone } from '../constants'
import { MoveList } from '../types'

import style from './styles/Game.module.css'

export default function Game() {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const [searchParams] = useSearchParams()
  const [player, setPlayer] = useState<Stone>(Stone.BLACK)
  const [stones, setStones] = useState<Stone[][]>([])
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS)
  const [moves, setMoves] = useState<MoveList[]>([])
  const boardSize = parseInt(searchParams.get('size') || '0')

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

  const resetGame = () => {
    if (
      !isGameOver(gameStatus) &&
      !window.confirm('Are you sure you want to reset the game?')
    )
      return
    setMoves([])
    setGameState(GameState.IN_PROGRESS)
    setPlayer(Stone.BLACK)
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
