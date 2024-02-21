import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores'

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
      className="flex flex-col gap-4 w-1/5 m-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {errorMessage &&
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>}
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Username" ref={usernameInput} autoComplete='false'
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="password" placeholder="Password" className="grow" value={password} onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
          }
          }/>
      </label>
      <button className="btn btn-primary" type='submit' disabled={!username || !password}>
        Login
      </button>
    </form>
  )
}