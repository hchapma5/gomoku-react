import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores'
import { GameItem } from '../components'
import { GameLog } from '../types'
import { Get } from '../utils/http'

import style from './styles/GameHistory.module.css'

export default function GameHistory() {
  const { user } = useUserStore()
  const [games, setGames] = useState<GameLog[]>([])

  let displayMessage = 'Looking for games...'

  const fetchUserGames = async () => {
    const games = await Get<GameLog[]>('/api/game/game-history')
    setGames(games)
  }

  useEffect(() => {
    fetchUserGames()
  }, [])

  if (!user) return <Navigate to='/login' />

  return (
    <div className={style.container}>
      {games.length < 1 ? (
        <p>{displayMessage}</p>
      ) : (
        games.map((game, index) => (
          <GameItem
            index={index + 1}
            id={game.id}
            date={game.date}
            outcome={game.outcome}
          />
        ))
      )}
    </div>
  )
}
