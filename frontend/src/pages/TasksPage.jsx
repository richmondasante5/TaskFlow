import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function TasksPage() {

  // Get authentication data and functions from AuthContext
  const { email, role, logout } = useContext(AuthContext)

  // Used for page navigation
  const navigate = useNavigate()

  const handleLogout = () => {

    // Remove authentication data from AuthContext and localStorage
    logout()

    // Redirect user back to login page
    navigate('/login')
  }

  return (
    <div>
      <h1>Tasks Page</h1>

      {/* Display logged-in user information */}
      <h2>Welcome {email}</h2>
      <p>Role: {role}</p>

      <p>You can see this page because a valid token exists.</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default TasksPage