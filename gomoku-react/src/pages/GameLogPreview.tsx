import { useNavigate, useParams } from 'react-router-dom'
import { Board, Button, GameLabel } from '../components'
import { Stone } from '../constants'
import { GameData } from '../types'
import { Get } from '../utils/http'
import { useEffect, useState } from 'react'
import { API_HOST } from '../constants'

import style from './styles/GameLogPreview.module.css'

export default function GameLogPreview() {
  const [stones, setStones] = useState<Stone[][]>([])
  const [gameData, setGameData] = useState<GameData>({} as GameData)
  const navigate = useNavigate()
  const { id = '' } = useParams()

  const fetchGameData = async (id: string) => {
    const data = await Get<GameData>(`${API_HOST}/api/game/${id}`)
    setGameData(data)
    const { moves, size } = data
    const board = [...Array(size)].map(() =>
      [...Array(size)].map(() => Stone.EMPTY)
    )
    moves.forEach((m) => {
      board[m.row][m.col] = m.player as Stone
    })

    setStones(board)
  }

  useEffect(() => {
    fetchGameData(id)
  }, [id])

  return (
    <div className={style.container}>
      <GameLabel label={gameData.outcome ? gameData.outcome : 'Loading...'} />
      <Board size={gameData.size} state={stones} moves={gameData.moves} />
      <Button type='submit' onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  )
}
