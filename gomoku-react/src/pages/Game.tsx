import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useGameStore, useUserStore } from '../stores'
import { Post, Put, Del } from '../utils/http'
import { Board, Button, GameLabel } from '../components'
import { GameState, Stone } from '../constants'
import { MoveList } from '../types'

import style from './styles/Game.module.css'

interface MoveResponse {
  state: GameState
  moveList: MoveList[]
}

export default function Game() {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const [searchParams] = useSearchParams()
  const boardSize = parseInt(searchParams.get('size') || '0')
  const gameId = searchParams.get('id') || ''
  const [player, setPlayer] = useState<Stone>(Stone.BLACK)
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS)
  const [moves, setMoves] = useState<MoveList[]>([])
  const [stones, setStones] = useState<Stone[][]>(
    [...Array(boardSize)].map(() => Array(boardSize).fill(Stone.EMPTY))
  )

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

  const isGameOver = gameState !== GameState.IN_PROGRESS ? true : false // check api for isGameOver

  const handleTurn = async (row: number, col: number) => {
    setStones([...stones, (stones[row][col] = player as Stone)])
    setMoves([...moves, { row, col, player } as MoveList])
    const outcome = (await Put(`/api/game/${gameId}`, {
      player,
      board: stones,
      moveList: moves,
    })) as MoveResponse
    if (outcome.state !== GameState.IN_PROGRESS) {
      setGameState(outcome.state)
    } else {
      setPlayer(player === Stone.BLACK ? Stone.WHITE : Stone.BLACK)
    }
  }

  const deleteGame = async () => {
    await Del(`/api/game/${gameId}`)
  }

  const leaveGame = () => {
    if (
      !isGameOver &&
      !window.confirm('Are you sure you want to leave the game?')
    )
      return deleteGame()

    if (isGameOver) {
      navigate('/game-history')
    } else {
      navigate('/')
    }
  }

  const resetGame = () => {
    if (
      !isGameOver &&
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
      <Board size={boardSize} state={stones} handler={() => handleTurn} />
      <div className={style.buttons}>
        <Button type='submit' onClick={resetGame} disabled={isGameOver}>
          Reset
        </Button>
        <Button type='submit' onClick={leaveGame}>
          Leave
        </Button>
      </div>
    </div>
  )
}
