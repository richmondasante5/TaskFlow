import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginUser } from '../services/authService'

function LoginPage() {
  // Shared auth function from AuthContext
  const { login } = useContext(AuthContext)

  // Used to navigate after login
  const navigate = useNavigate()

  // Form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // UI state
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault()

    setErrorMessage('')
    setLoading(true)

    try {
      // Send email and password to backend
      const response = await loginUser({
        email,
        password,
      })

      const loginResponse = response.data

      // Stop if backend did not return a token
      if (!loginResponse.token) {
        setErrorMessage(
          loginResponse.message || 'Login failed'
        )
        return
      }

      // Store login data in AuthContext
      login(loginResponse)

      // Go to tasks after successful login
      navigate('/tasks')
    } catch (error) {
      console.error('Login failed:', error)

      setErrorMessage(
        'Unable to login. Please check your email and password.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

        {/* Branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            T
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to TaskFlow
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to manage your tasks and team workflow.
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input type="email" value={email} onChange={(event) => setEmail(event.target.value) }
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        {/* Access information */}
        <div className="mt-7 border-t border-gray-200 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Need access to TaskFlow?
          </p>

          <p className="mt-1 text-sm font-medium text-gray-700">
            Contact your administrator.
          </p>
        </div>

      </div>

    </div>
  )
}

export default LoginPage