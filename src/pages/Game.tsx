import { useLocalStorage } from 'usehooks-ts'
import { useGameStore, useUserStore } from '../stores'
import { Board, Button, GameLabel } from '../components'
import { GameLog } from '../types'
import { GAME_STATE } from '../constants'
import { Navigate, useNavigate } from 'react-router-dom'

import style from './styles/Game.module.css'

const currentDate = () => {
  const now = new Date()
  return `${String(now.getDate()).padStart(2, '0')}/${String(
    now.getMonth() + 1
  ).padStart(2, '0')}/${now.getFullYear()}`
}

export default function Game() {
  const { user } = useUserStore()
  const {
    player,
    boardSize,
    moveList,
    gameState,
    stones,
    initializeGame: initGame,
    endGame,
  } = useGameStore()
  const [gameHistory, logGameHistory] = useLocalStorage<GameLog[]>(
    'gomoku-games',
    []
  )
  const navigate = useNavigate()

  const getMessage = (state: GAME_STATE) => {
    const message = `Current Player: ${player}`
    switch (state) {
      case GAME_STATE.WIN:
        return `Player ${player} wins!`
      case GAME_STATE.DRAW:
        return "It's a Draw"
      default:
        return message
    }
  }

  const handleLeave = () => {
    if (gameState === GAME_STATE.PLAYING) {
      endGame()
      navigate('/')
    } else {
      const game: GameLog = {
        size: boardSize,
        date: currentDate(),
        result: getMessage(gameState),
        moveList: moveList,
      }
      logGameHistory([...gameHistory, game])
      navigate('/game-history')
    }
  }

  if (!user) return <Navigate to='/login' />
  return (
    <div className={style.container}>
      <GameLabel label={getMessage(gameState)} />
      <Board size={boardSize} state={stones} />
      <div className={style.buttons}>
        <Button type='submit' onClick={() => initGame()}>
          Reset
        </Button>
        <Button type='submit' onClick={handleLeave}>
          Leave
        </Button>
      </div>
    </div>
  )
}
