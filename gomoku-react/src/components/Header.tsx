import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUserStore } from '../stores'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useUserStore()

  const getActions = () => {
    if (user) {
      return (
        <>
          <button
            className="btn btn-ghost noanimation btn-lg hover:bg-transparent"
            onClick={() => navigate('game-history')}
          >
            Game History
          </button>
          <button
            className="btn btn-ghost noanimation btn-lg hover:bg-transparent"
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
        <button className="btn btn-ghost noanimation btn-lg hover:bg-transparent" onClick={() => navigate('login')}>
          Login
        </button>
      ) : (
        <button className="btn btn-ghost noanimation btn-lg hover:bg-transparent" onClick={() => navigate('sign-up')}>
          Sign Up
        </button>
      )
    }
  }

  return (
    <header className="p-4">
      <div className="flex w-90% max-w-1200px justify-between m-auto">
        <Link className="no-underline text-4xl font-semibold text-primary hover:text-accent" to='/'>
          Gomoku
          </Link>
        <div className="flex gap-x-2">
          {getActions()}
          <ThemeToggle />
          </div>
      </div>
    </header>
  )
}
