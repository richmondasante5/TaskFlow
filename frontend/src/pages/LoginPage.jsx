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

      // Handle unexpected errors
      setErrorMessage(
        'Unable to login. Please check your details.'
      )

    } finally {

      // Hide loading state regardless of success or failure
      setLoading(false)
    }
  }

  return (
    <div>

      <h1>Login Page</h1>

      {/* Login Form */}
      <form onSubmit={handleLogin}>

        {/* Email Input */}
        <div>
          <label>Email</label>

          <input
            type="email"

            // Connect input to email state
            value={email}

            // Update email state on every keystroke
            onChange={(event) =>
              setEmail(event.target.value)
            }

            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label>Password</label>

          <input
            type="password"

            // Connect input to password state
            value={password}

            // Update password state on every keystroke
            onChange={(event) =>
              setPassword(event.target.value)
            }

            required
          />
        </div>

        {/* Show error only if one exists */}
        {errorMessage && (
          <p>{errorMessage}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"

          // Disable button while request is running
          disabled={loading}
        >

          {/* Conditional rendering */}
          {loading
            ? 'Logging in...'
            : 'Login'}
        </button>

      </form>

    </div>
  )
}

export default LoginPage