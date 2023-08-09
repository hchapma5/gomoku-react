import { useEffect, useState } from 'react'
import { GameItem } from '../components'
import { GameLog } from '../types'
import style from './GameHistory.module.css'

export default function GameHistory() {
  const [games, setGames] = useState<GameLog[]>([])

  useEffect(() => {
    const storedGames = localStorage.getItem('gomoku-games')
    if (storedGames) setGames(JSON.parse(storedGames))
    console.log(games)
  }, [])

  return (
    <div className={style.container}>
      {games.map((game, index) => (
        <GameItem id={index} date={game.date} outcome={game.result} />
      ))}
    </div>
  )
}
