import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores'
import { GameItem } from '../components'
import { GameLog } from '../types'

import style from './styles/GameHistory.module.css'

export default function GameHistory() {
  const { user } = useUserStore()
  const [games, setGames] = useState<GameLog[]>([])

  const placeholderMessage = 'No game logs found'

  useEffect(() => {
    const storedGames = localStorage.getItem('gomoku-games')
    if (storedGames) setGames(JSON.parse(storedGames))
  }, [])

  if (!user) return <Navigate to='/login' />

  return (
    <div className={style.container}>
      {games.length < 1 ? (
        <p>{placeholderMessage}</p>
      ) : (
        games.map((game, index) => (
          <GameItem id={index} date={game.date} outcome={game.result} />
        ))
      )}
    </div>
  )
}
