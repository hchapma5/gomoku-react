import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores'
import Button from './Button'

import style from './styles/GameItem.module.css'

type GameItemProps = {
  id: string
  date: string
  outcome: string
}

export default function GameItem({ id, date, outcome }: GameItemProps) {
  const { setGameId } = useGameStore()
  const navigate = useNavigate()

  const handleClick = () => {
    setGameId(id)
    navigate(`/game-log/:${id}`)
  }

  return (
    <div className={style.container}>
      <p>
        Game#{id} @{date} {outcome}
      </p>
      <Button type='submit' onClick={handleClick}>
        View game log
      </Button>
    </div>
  )
}
