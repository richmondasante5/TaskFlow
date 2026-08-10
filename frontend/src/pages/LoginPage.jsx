import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginUser } from '../services/authService'

function LoginPage() {
  // Get login function from AuthContext
  // Used to save token, email and role after successful login
  const { login } = useContext(AuthContext)

  // Used for page navigation
  const navigate = useNavigate()

  // ============================
  // Form State
  // ============================

  // Stores email input value
  const [email, setEmail] = useState('')

  // Stores password input value
  const [password, setPassword] = useState('')

  // ============================
  // UI State
  // ============================

  // Stores error messages
  const [errorMessage, setErrorMessage] = useState('')

  // Controls loading state while login request is running
  const [loading, setLoading] = useState(false)

  // ============================
  // Login Handler
  // ============================

  const handleLogin = async (event) => {
    // Prevent page refresh when form is submitted
    event.preventDefault()

    // Clear previous error messages
    setErrorMessage('')

    // Show loading state
    setLoading(true)

    try {
      // Send login request to Spring Boot backend
      const response = await loginUser({
        email,
        password,
      })

      // Extract response data
      const loginResponse = response.data

      // Check if login failed
      if (!loginResponse.token) {
        // Show backend error message
        setErrorMessage(
          loginResponse.message || 'Login failed'
        )

        return
      }

      // Save token, email and role into AuthContext
      login(loginResponse)

      // Redirect user to tasks page after successful login
      navigate('/tasks')
    } catch (error) {
      console.error('Login failed:', error)

      // Handle unexpected errors
      setErrorMessage(
        'Unable to login. Please check your email and password.'
      )
    } finally {
      // Hide loading state regardless of success or failure
      setLoading(false)
    }
  }

  return (
    // Full login page
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      {/* Main login card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

        {/* TaskFlow branding */}
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

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"

              // Connect input to email state
              value={email}

              // Update email state on every keystroke
              onChange={(event) =>
                setEmail(event.target.value)
              }

              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"

              // Connect input to password state
              value={password}

              // Update password state on every keystroke
              onChange={(event) =>
                setPassword(event.target.value)
              }

              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Show error only if one exists */}
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"

            // Disable button while request is running
            disabled={loading}

            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* Conditional rendering */}
            {loading
              ? 'Signing in...'
              : 'Sign In'}
          </button>

        </form>

        {/* Account access information */}
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