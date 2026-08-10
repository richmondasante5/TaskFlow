import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function NotFoundPage() {
  // Get token from AuthContext
  // If token exists, the user is logged in
  const { token } = useContext(AuthContext)

  // Used to navigate to another route
  const navigate = useNavigate()

  // Decide where the button should send the user
  const handleGoBack = () => {
    if (token) {
      // Logged-in users return to Dashboard
      navigate('/dashboard')
    } else {
      // Logged-out users return to Login
      navigate('/login')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

      <div className="text-center">

        {/* Error code */}
        <p className="text-6xl font-bold text-blue-600">
          404
        </p>

        {/* Page title */}
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-3 text-gray-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Navigation button */}
        <button
          type="button"
          onClick={handleGoBack}
          className="mt-7 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {token ? 'Back to Dashboard' : 'Back to Login'}
        </button>

      </div>

    </div>
  )
}

export default NotFoundPage