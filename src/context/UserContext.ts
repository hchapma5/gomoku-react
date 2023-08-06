import { createContext } from 'react'
import { User } from '../types'

type UserContextType = {
  user?: User
  login: (username: string) => void
  logout: () => void
  boardSize: number
  selectSize: (size: number) => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext
