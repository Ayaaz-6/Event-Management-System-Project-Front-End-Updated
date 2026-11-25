import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }) {
  const { user, authReady } = useAuth()
  const location = useLocation()

  // Wait for LocalStorage session hydration before redirecting on page refresh.
  if (!authReady) return null

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (role && user.role !== role) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />
    if (user.role === 'organizer') return <Navigate to="/organizer" replace />
    return <Navigate to="/dashboard" replace />
  }

  return children
}
