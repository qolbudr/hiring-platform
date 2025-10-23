'use client'
import { useState } from 'react'
import { useAuthStore } from '@/module/auth/store/auth.store'
import authService from '../services/authService'

export function useAuth() {
  const { setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true)
      const user = await authService.login(email, password)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, loading }
}
