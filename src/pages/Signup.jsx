import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'user'
  })

  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const update = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  function submit(e) {
    e.preventDefault()

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    const result = signup(form)

    if (!result.ok) {
      setError(result.message)
      return
    }

    const destination = result.user.role === 'organizer' ? '/organizer' : '/dashboard'
    navigate(destination, { replace: true })
  }

  return (
    <>
      <Navbar />

      <main className="auth-wrap">
        <div className="auth-art signup-art">
          <div className="auth-art-orb" />

          <div className="auth-art-content">
            <span className="brand-mark">
              <i className="bi bi-stars" />
            </span>

            <div className="eyebrow">GOOD TIMES START HERE</div>

            <h2>
              Find your
              <br />
              <span>kind of crowd.</span>
            </h2>

            <p>
              Discover events that match your interests and make
              memories with people who get you.
            </p>
          </div>

          <div className="auth-art-bottom">
            A WORLD OF EXPERIENCES, ONE PLACE.
          </div>
        </div>

        <div className="auth-panel">
          <form className="auth-form" onSubmit={submit}>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              JOIN THE COMMUNITY
            </div>

            <h1>
              Create your <span>account.</span>
            </h1>

            <p className="auth-subtitle">
              A few details and you're ready to explore.
            </p>

            {error && <div className="alert-error">{error}</div>}

            <label className="field">
              Full name
              <input
                required
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
              />
            </label>

            <label className="field">
              Email address
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="you@example.com"
              />
            </label>

            <label className="field">
              Account type
              <select
                name="role"
                value={form.role}
                onChange={update}
              >
                <option value="user">User — Browse and register for events</option>
                <option value="organizer">Event Organizer — Create and manage events</option>
              </select>
            </label>

            <label className="field">
              Password
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={update}
                placeholder="At least 6 characters"
              />
            </label>

            <label className="field">
              Confirm password
              <input
                required
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={update}
                placeholder="Re-enter your password"
              />
            </label>

            <button className="btn btn-primary btn-full btn-large">
              Create account <i className="bi bi-arrow-right" />
            </button>

            <div className="auth-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </div>

            <p className="tiny-legal">
              By creating an account, you agree to use this academic
              demo responsibly.
            </p>
          </form>
        </div>
      </main>
    </>
  )
}