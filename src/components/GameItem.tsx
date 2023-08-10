import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../context'
import Button from './Button'
import style from './GameItem.module.css'

type GameItemProps = {
  id: number
  date: string
  outcome: string
}

export default function GameItem({ id, date, outcome }: GameItemProps) {
  const { setGameId } = useGameStore()
  const navigate = useNavigate()

  const handleClick = () => {
    setGameId(id)
    navigate(`/game-log/:${id + 1}`)
  }

  return (
    <div className={style.container}>
      Game#{id + 1} @{date} {outcome}
      <Button type='submit' onClick={handleClick}>
        View game log
      </Button>
    </div>
  )
}
