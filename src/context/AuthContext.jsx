import { createContext, useContext, useEffect, useState } from 'react'
import {
  clearSession,
  getSession,
  getUsers,
  saveSession,
  saveUsers,
  seedData
} from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    seedData()
    setUser(getSession())
    setAuthReady(true)
  }, [])

  function signup({ name, email, password, role = 'user' }) {
    const users = getUsers()
    const normalizedEmail = email.trim().toLowerCase()

    if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
      return {
        ok: false,
        message: 'An account with this email already exists.'
      }
    }

    // Public signup can create users or organizers, never administrators.
    const safeRole = role === 'organizer' ? 'organizer' : 'user'
    const newUser = {
      id: `${safeRole}-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: safeRole
    }

    saveUsers([...users, newUser])

    const session = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }

    saveSession(session)
    setUser(session)
    return { ok: true, user: session }
  }

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const found = getUsers().find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === password
    )

    if (!found) {
      return { ok: false, message: 'Email or password is incorrect.' }
    }

    const session = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role || 'user'
    }

    saveSession(session)
    setUser(session)
    return { ok: true, user: session }
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, authReady, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
