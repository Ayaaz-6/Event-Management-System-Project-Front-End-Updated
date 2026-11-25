import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function submit(e) {
    e.preventDefault()

    const result = login(email, password)

    if (!result.ok) {
      setError(result.message)
      return
    }

    const role = result.user.role

    let destination = '/dashboard'

    if (role === 'admin') {
      destination = '/admin'
    } else if (role === 'organizer') {
      destination = '/organizer'
    }

    navigate(location.state?.from || destination, {
      replace: true
    })
  }

  return (
    <>
      <Navbar />

      <main className="auth-wrap">
        <div className="auth-art">
          <div className="auth-art-orb" />

          <div className="auth-art-content">
            <span className="brand-mark">
              <i className="bi bi-stars" />
            </span>

            <div className="eyebrow">WELCOME BACK</div>

            <h2>
              Your next
              <br />
              <span>great moment</span>
              <br />
              is waiting.
            </h2>

            <p>
              Pick up where you left off. Your next experience is
              just around the corner.
            </p>
          </div>

          <div className="auth-art-bottom">
            EVENTORA · DISCOVER. EXPERIENCE. CELEBRATE.
          </div>
        </div>

        <div className="auth-panel">
          <form className="auth-form" onSubmit={submit}>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR ACCOUNT
            </div>

            <h1>
              Welcome <span>back.</span>
            </h1>

            <p className="auth-subtitle">
              Log in to explore and manage your experiences.
            </p>

            {error && <div className="alert-error">{error}</div>}

            <label className="field">
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label className="field">
              Password
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>

            <button className="btn btn-primary btn-full btn-large">
              Log in <i className="bi bi-arrow-right" />
            </button>

            <div className="auth-switch">
              New to EVENTORA? <Link to="/signup">Create an account</Link>
            </div>

            <div className="demo-credentials">
              <strong>Demo admin access</strong>
              <span>admin@eventora.com</span>
              <span>Admin@123</span>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}