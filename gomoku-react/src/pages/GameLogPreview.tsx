import { useNavigate } from 'react-router-dom'
import { Board, Button, GameLabel } from '../components'
import { Stone } from '../constants'
import { useGameStore } from '../stores'
import { MoveList } from '../types'

import style from './styles/GameLogPreview.module.css'

export default function GameLogPreview() {
  const navigate = useNavigate()
  const { gameId } = useGameStore()

  const gameLog = localStorage.getItem('gomoku-games')

  let message: string = ''
  let size: number = 0
  let board: Stone[][] = []
  let moveList: MoveList[] = []

  if (gameLog && gameId !== undefined) {
    const parsedGameLog = JSON.parse(gameLog)

    message = parsedGameLog[gameId].result
    size = parsedGameLog[gameId].size
    moveList = parsedGameLog[gameId].moveList

    board = [...Array(size)].map(() => [...Array(size)].map(() => Stone.EMPTY))
    moveList.forEach((move: MoveList) => {
      board[move.row][move.col] =
        move.player === Stone.BLACK ? Stone.BLACK : Stone.WHITE
    })
  }

  return (
    <div className={style.container}>
      {message && <GameLabel label={message} />}
      {size && board && <Board size={size} state={board} moves={moveList} />}
      <Button type='submit' onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  )
}
