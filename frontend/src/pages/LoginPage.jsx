import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginUser } from '../services/authService'

function LoginPage() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // UI state
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    setErrorMessage('')
    setLoading(true)

    try {
      const response = await loginUser({
        email,
        password,
      })

      const loginResponse = response.data

      if (!loginResponse.token) {
        setErrorMessage(loginResponse.message || 'Login failed')
        return
      }

      login(loginResponse)
      navigate('/tasks')
    } catch (error) {
      setErrorMessage('Unable to login. Please check your details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage