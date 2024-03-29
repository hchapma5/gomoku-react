import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../stores'

import style from './styles/Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useUserStore()

  const getActions = () => {
    if (user) {
      return (
        <>
          <button
            className={style.action}
            onClick={() => navigate('game-history')}
          >
            Game History
          </button>
          <button
            className={style.action}
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            Logout
          </button>
        </>
      )
    } else {
      return location.pathname !== '/login' ? (
        <button className={style.action} onClick={() => navigate('login')}>
          Login
        </button>
      ) : (
        <button className={style.action} onClick={() => navigate('sign-up')}>
          Sign Up
        </button>
      )
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to='/'>Gomoku</Link>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  )
}
