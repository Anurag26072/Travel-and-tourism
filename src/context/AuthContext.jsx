import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('travel_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem('travel_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('travel_user')
    }
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 800))
      if (email && password.length >= 6) {
        const userData = {
          id: Date.now(),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
          avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${email}`,
          joinedAt: new Date().toISOString(),
          tripsPlanned: Math.floor(Math.random() * 12) + 1,
        }
        setUser(userData)
        return { success: true }
      } else {
        throw new Error('Invalid credentials. Password must be at least 6 characters.')
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
  }

  const register = async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 800))
      const userData = {
        id: Date.now(),
        name,
        email,
        avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${email}`,
        joinedAt: new Date().toISOString(),
        tripsPlanned: 0,
      }
      setUser(userData)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register, setError }}>
      {children}
    </AuthContext.Provider>
  )
}
