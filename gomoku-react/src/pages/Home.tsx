import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from '../components'
import { GOMOKU_BOARD_SIZE, GameState } from '../constants'
import { useGameStore, useUserStore } from '../stores'

import style from './styles/Home.module.css'
import { Post } from '../utils/http'

interface CreateResponse {
  gameId: string
}

export default function Home() {
  const [boardSize, setBoardSize] = useState<number>(0)
  const [gameId, setGameId] = useState('')
  const { user } = useUserStore()
  const navigate = useNavigate()

  const fetchNewGameId = async () => {
    const response = (await Post('/api/game', {
      boardSize: boardSize,
    })) as CreateResponse
    return response.gameId
  }

  const handleClick = () => {
    if (user) {
      if (!boardSize) return
      setGameId(fetchNewGameId)
      navigate(`/game?size=${boardSize}?id=${gameId}`)
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
      />
      <Button type='submit' onClick={handleClick}>
        {gameState === 'IN_PROGRESS' ? 'Resume' : 'Start'}
      </Button>
    </div>
  )
}
