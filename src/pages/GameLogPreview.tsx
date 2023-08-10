import { useNavigate } from 'react-router-dom'
import { Board, Button, GameLabel } from '../components'
import { PLAYER, TILE_STATUS } from '../constants'
import { useGameStore } from '../context'
import { MoveList } from '../types'
import style from './GameLogPreview.module.css'

export default function GameLogPreview() {
  const navigate = useNavigate()
  const { gameId } = useGameStore()

  const gameLog = localStorage.getItem('gomoku-games')

  let message: string = ''
  let size: number = 0
  let board: TILE_STATUS[][] = []
  let moveList: MoveList[] = []

  if (gameLog && gameId !== undefined) {
    const parsedGameLog = JSON.parse(gameLog)

    message = parsedGameLog[gameId].result
    size = parsedGameLog[gameId].size
    moveList = parsedGameLog[gameId].moveList

    board = [...Array(size)].map(() =>
      [...Array(size)].map(() => TILE_STATUS.EMPTY)
    )
    moveList.forEach((move: MoveList) => {
      board[move.row][move.col] =
        move.player === PLAYER.BLACK ? TILE_STATUS.BLACK : TILE_STATUS.WHITE
    })
  }

  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className={style.container}>
      {message && <GameLabel label={message} />}
      {size && board && <Board size={size} state={board} moves={moveList} />}
      <Button type='submit' onClick={handleClick}>
        Back
      </Button>
    </div>
  )
}
