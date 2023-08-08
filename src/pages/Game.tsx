import { useNavigate } from 'react-router'
import { useGameStore } from '../context'
import { Board, Button } from '../components'
import { checkWin, checkDraw } from '../utils/GameLogic'

import style from './Game.module.css'
import { useEffect } from 'react'
import { PLAYER } from '../constants'

export default function Game() {
  const { player, setPlayer, boardSize, stones } = useGameStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (checkWin(player, stones)) console.log('win')
    if (checkDraw(stones)) console.log('draw')
    setPlayer(player === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK)
  }, [stones])

  return (
    <div className={style.container}>
      <label>Current Player: {player}</label>
      <Board size={boardSize} />
      <div className={style.buttons}>
        <Button type='submit' onClick={() => navigate('/')}>
          Reset
        </Button>
        <Button type='submit' onClick={() => console.log(stones)}>
          Leave
        </Button>
      </div>
    </div>
  )
}
