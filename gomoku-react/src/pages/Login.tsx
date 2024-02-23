import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores'
import { UserIcon, PasswordIcon, ErrorIcon } from '../icons'

export default function Login() {
  const { login } = useUserStore()
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')
    const result = await login(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])

  return (
    <form
      className='flex flex-col justify-center items-center gap-4 w-2/5 h-96 bg-info bg-secondary pb-2 shadow-lg'
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      <div
        role='alert'
        className={'alert alert-error rounded-sx w-2/3' + (errorMessage ? '' : ' invisible')}
      >
        <ErrorIcon />
        <span>{errorMessage}</span>
      </div>
      <label className='input flex items-center gap-2 w-2/3'>
        <UserIcon />
        <input
          type='text'
          className='grow'
          placeholder='Username'
          ref={usernameInput}
          autoComplete='false'
          onChange={(e) => {
            setUsername(e.target.value)
            setErrorMessage('')
          }}
        />
      </label>
      <label className='input flex items-center gap-2 w-2/3'>
        <PasswordIcon />
        <input
          type='password'
          placeholder='Password'
          className='grow'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage('')
          }}
        />
      </label>
      <button
        className='btn btn-primary w-2/3'
        type='submit'
        disabled={!username || !password}
      >
        Login
      </button>
    </form>
  )
}
