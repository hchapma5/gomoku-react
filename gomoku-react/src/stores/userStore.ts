import { create } from 'zustand'
import { User, Credential } from '../types'
import { post, setToken } from '../utils/http'

type UserStore = {
  user?: User
  setUser: (user: User) => void
  login: (username: string, password: string) => Promise<true | string>
  register: (username: string, password: string) => Promise<true | string>
  logout: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  login: async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(`/api/auth/login`, {
        username,
        password,
      })
      set({ user })
      setToken(user.token)
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to login at this moment, please try again'
    }
  },
  logout: () => {
    set({ user: undefined })
    setToken('')
  },
  register: async (username: string, password: string) => {
    try {
      const user = await post<Credential, User>(`/api/auth/register`, {
        username,
        password,
      })
      set({ user })
      setToken(user.token)
      return true
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }
      return 'Unable to register at this moment, please try again'
    }
  },
}))

export default useUserStore
