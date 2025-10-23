import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/module/auth/types/user'

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' } // stored in localStorage
  )
)
