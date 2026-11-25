import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const leave = () => { logout(); navigate('/') }
  return <header className="topbar">
    <Link to="/" className="brand"><span className="brand-mark"><i className="bi bi-stars" /></span> EVENTORA<span className="brand-dot">.</span></Link>
    <nav className="nav-links">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/events">Explore events</NavLink>
      {user?.role === 'user' && <NavLink to="/my-registrations">My registrations</NavLink>}
      {user?.role === 'admin' && <NavLink to="/admin">Admin panel</NavLink>}
      {user?.role === 'organizer' && <NavLink to="/organizer">Organizer dashboard</NavLink>}
    </nav>
    <div className="nav-actions">
      {user ? <><span className="nav-greeting">Hi, {user.name.split(' ')[0]}</span><button className="btn btn-ghost btn-small" onClick={leave}>Log out</button></>
        : <><Link className="login-link" to="/login">Log in</Link><Link className="btn btn-primary btn-small" to="/signup">Get started <i className="bi bi-arrow-up-right" /></Link></>}
    </div>
  </header>
}