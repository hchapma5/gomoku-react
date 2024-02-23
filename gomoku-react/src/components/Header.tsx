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
            className='btn btn-ghost noanimation btn-lg hover:bg-transparent'
            onClick={() => navigate('game-history')}
          >
            Game History
          </button>
          <button
            className='btn btn-ghost noanimation btn-lg hover:bg-transparent'
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
        <button
          className='btn btn-ghost noanimation btn-lg hover:bg-transparent'
          onClick={() => navigate('login')}
        >
          Login
        </button>
      ) : (
        <button
          className='btn btn-ghost noanimation btn-lg hover:bg-transparent'
          onClick={() => navigate('sign-up')}
        >
          Sign Up
        </button>
      )
    }
  }
  return (
    <header className='flex justify-between items-center w-full px-4 py-2 mb-20'>
      <a
        href='/'
        className='no-underline text-lg font-bold justify-start w-1/3'
      >
        Home
      </a>
      <span className='flex justify-center w-1/3 text-4xl text-purple-900 font-extrabold tracking-wide uppercase disabled'>
        Gomoku
      </span>
      <div className='flex justify-end w-1/3 gap-x-2'>
        {getActions()}
        <ThemeToggle />
      </div>
    </header>
  )
}
