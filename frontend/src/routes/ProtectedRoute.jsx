import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ children }) {

  // Get token from AuthContext
  const { token } = useContext(AuthContext)

  // Redirect to login if user is not authenticated
  if (!token) {
    return <Navigate to="/login" />
  }

  // User is authenticated, show requested page
  return children
}

export default ProtectedRoute