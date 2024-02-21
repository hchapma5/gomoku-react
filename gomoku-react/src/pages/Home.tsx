import { useNavigate } from 'react-router-dom'
import { GOMOKU_BOARD_SIZE, GameState } from '../constants'
import { useGameStore, useUserStore } from '../stores'
import { ChangeEvent } from 'react'

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

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => 
  {
    if (!user) return
    if (event.target.value === undefined) return
    const value = parseInt(event.target.value)
    setBoardSize(value)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-20% m-8">
      <select  className="select select-bordered w-full h-full max-w-xs select-primary"
      onChange={handleSelect}
      disabled={activeGame}
      >
        <option selected>
          {'Choose a board size' + (boardSize ? ` (${boardSize})` : '')}
        </option>
        {Array.from({ length: GOMOKU_BOARD_SIZE.MAX - GOMOKU_BOARD_SIZE.MIN + 1 }, (_, i) => i + GOMOKU_BOARD_SIZE.MIN).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <button className="btn btn-active bg-primary" onClick={handleClick}>
        {gameState === 'IN_PROGRESS' ? 'Resume' : 'Start'}
      </button>
    </div>
  )
}
