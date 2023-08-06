import { useState } from 'react'
import { User } from '../types'
import { UserContext } from '../context'
import { GOMOKU_BOARD_SIZE } from '../constants'

type UserProviderProps = {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [boardSize, setBoardSize] = useState<number>(GOMOKU_BOARD_SIZE.DEFAULT)

  const login = (username: string) => setUser({ username })
  const logout = () => setUser(undefined)
  const selectSize = (size: number) => setBoardSize(size)

  return (
    <UserContext.Provider
      value={{ user, login, logout, boardSize, selectSize }}
    >
      {children}
    </UserContext.Provider>
  )
}
