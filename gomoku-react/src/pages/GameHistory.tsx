import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../stores'
import { GameItem } from '../components'
import { GameLog } from '../types'
import { Get } from '../utils/http'
import { API_HOST } from '../constants'

import style from './styles/GameHistory.module.css'

export default function GameHistory() {
  const { user } = useUserStore()
  const [games, setGames] = useState<GameLog[]>([])
  const [isFetched, setIsFetched] = useState(false)

  const fetchUserGames = async () => {
    const games = await Get<GameLog[]>(`${API_HOST}/api/game/game-history`)
    setGames(games.filter((game) => game.outcome !== 'Game in progress'))
  }

  useEffect(() => {
    fetchUserGames().then(() => {
      setIsFetched(true)
    })
  }, [])

  if (!user) return <Navigate to='/login' />

  return (
    <div className={style.container}>
      {isFetched ? (
        games.length < 1 ? (
          <p>No games found!</p>
        ) : (
          games.map((game, index) => (
            <GameItem
              index={index + 1}
              id={game.id}
              date={game.date}
              outcome={game.outcome}
            />
          ))
        )
      ) : (
        <p>Looking for games</p>
      )}
    </div>
  )
}
