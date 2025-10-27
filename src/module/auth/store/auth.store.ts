import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/module/auth/types/user'
import { LoginFormValues } from '../schema/login.schema'
import { BaseStatus } from '@/shared/types/base_status'
import authService from '../services/authService'

interface AuthState {
  status: BaseStatus,
  user: User | null
  setUser: (user: User) => void,
  login: (data: LoginFormValues) => Promise<User | undefined>,
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: BaseStatus.initial(),
      user: null,
      login: async (data) => {
        try {
          set({ status: BaseStatus.loading() });
          const user = await authService.login(data.email, data.password);
          set({ user, status: BaseStatus.success() });
          return user;
        } catch (error) {
          set({ status: BaseStatus.error((error as Error).message) });
        }
      },
      setUser: (user) => set({ user }),
      logout: async () => {
        await authService.logOut();
        set({ user: null });
      },
    }),
    { name: 'auth-storage' } // stored in localStorage
  )
)
