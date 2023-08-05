import { Button } from '../components'
import { useNavigate } from 'react-router-dom'

import style from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={style.container}>
      Content
      <Button type='submit' onClick={() => navigate('game')}>
        Start
      </Button>
    </div>
  )
}
