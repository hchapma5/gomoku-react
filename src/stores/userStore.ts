import { create } from 'zustand'
import { User } from '../types'

type UserStore = {
  user?: User
  login: (username: string) => void
  logout: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  login: (username: string) => set({ user: { username } }),
  logout: () => set({ user: undefined }),
}))

export default useUserStore
