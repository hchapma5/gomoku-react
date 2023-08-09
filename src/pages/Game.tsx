import { useNavigate } from 'react-router'
import { useGameStore } from '../context'
import { Board, Button } from '../components'
import { checkWin, checkDraw } from '../utils/GameLogic'

import style from './Game.module.css'
import { useEffect } from 'react'

export default function Game() {
  const { player, stones, initGame } = useGameStore()
  // const navigate = useNavigate()

  useEffect(() => {
    if (checkWin(player, stones)) console.log('win')
    if (checkDraw(stones)) console.log('draw')
  }, [stones])

  return (
    <div className={style.container}>
      <label>Current Player: {player}</label>
      <Board />
      <div className={style.buttons}>
        <Button type='submit' onClick={() => initGame()}>
          Reset
        </Button>
        <Button
          type='submit'
          onClick={() => {
            console.log(stones)
            console.log('hello')
          }}
        >
          Leave
        </Button>
      </div>
    </div>
  )
}
