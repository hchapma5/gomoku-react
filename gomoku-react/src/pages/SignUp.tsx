import { useUserStore } from '../stores'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIcon, PasswordIcon, ErrorIcon } from '../icons'

export default function SignUp() {
  const { register } = useUserStore()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async () => {
    setErrorMessage('')
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    const result = await register(username, password)
    if (result) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  return (
    <form
      className='flex flex-col justify-center items-center gap-4 w-2/5 h-96 bg-secondary pb-2 shadow-lg'
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp()
      }}
    >
      <div
        role='alert'
        className={
          'alert alert-error rounded-sx w-2/3' + (errorMessage ? '' : ' invisible')
        }
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
            setErrorMessage('')
            setPassword(e.target.value)
          }}
        />
      </label>
      <label className='input flex items-center gap-2 w-2/3'>
        <PasswordIcon />
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => {
            setErrorMessage('')
            setConfirmPassword(e.target.value)
          }}
        />
      </label>
      <button
        className='btn btn-primary w-2/3'
        type='submit'
        disabled={!username || !password || !confirmPassword}
      >
        Sign Up
      </button>
    </form>
  )
}
