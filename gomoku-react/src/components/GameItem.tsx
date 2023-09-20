import { useNavigate } from 'react-router-dom'
import Button from './Button'

import style from './styles/GameItem.module.css'

type GameItemProps = {
  index: number
  id: string
  date: string
  outcome: string
}

export default function GameItem({ index, id, date, outcome }: GameItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/game-log/${id}`)
  }

  return (
    <div className={style.container}>
      <p>
        Game#{index} @{date} {outcome}
      </p>
      <Button type='submit' onClick={handleClick}>
        View game log
      </Button>
    </div>
  )
}
