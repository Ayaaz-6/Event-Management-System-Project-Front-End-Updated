import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import MyRegistrations from './pages/MyRegistrations'
import AdminDashboard from './pages/AdminDashboard'
import ManageEvents from './pages/ManageEvents'
import ManageUsers from './pages/ManageUsers'
import OrganizerDashboard from './pages/OrganizerDashboard'

import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function DashboardRedirect() {
  const { user } = useAuth()

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  if (user?.role === 'organizer') {
    return <Navigate to="/organizer" replace />
  }

  return <Navigate to="/dashboard" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/events" element={<Events />} />

      <Route path="/events/:id" element={<EventDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* User Registrations */}
      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute role="user">
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Event Management */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute role="admin">
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      {/* Admin User Management */}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      {/* Organizer Dashboard */}
      <Route
        path="/organizer"
        element={
          <ProtectedRoute role="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect users to the correct dashboard */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <DashboardRedirect />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}