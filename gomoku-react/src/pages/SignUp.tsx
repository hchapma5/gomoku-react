import { useUserStore } from '../stores'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      className="flex flex-col gap-4 w-1/5 m-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp()
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
          <input type="text" className="grow" placeholder="Username" autoComplete='false'onChange={((e) => {
            setUsername(e.target.value)
            setErrorMessage('')
          })}/>
        </label>
      <label className="input input-bordered flex items-center gap-2">
        <input type="password" placeholder="Password" className="grow" value={password} onChange={(e) => {
          setErrorMessage('')
          setPassword(e.target.value)
        }}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" placeholder='Confirm password' value={confirmPassword} onChange={(e) => {
          setErrorMessage('')
          setConfirmPassword(e.target.value)
        }} />
      </label>
      <button className="btn btn-primary noanimation" type='submit' disabled={!username || !password || !confirmPassword}>
        Sign Up
      </button>
    </form>
  )
}
