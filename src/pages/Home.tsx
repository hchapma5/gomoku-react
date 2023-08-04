import { Button } from '../components'

import style from './Home.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      Content
      <Button type='submit'>Start</Button>
    </div>
  )
}
