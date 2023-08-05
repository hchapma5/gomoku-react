import { Button, Dropdown } from '../components'
import { useNavigate } from 'react-router-dom'

// Write handleClick function
// If user is logged in, redirect to game page
// otherwise show login page

import style from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  const message = 'Choose board size'

  return (
    <div className={style.container}>
      <Dropdown minValue={5} maxValue={19} label={message} />
      <Button type='submit' onClick={() => navigate('game')}>
        Start
      </Button>
    </div>
  )
}
