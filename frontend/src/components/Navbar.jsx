import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  // Get logged-in user information and logout function
  const { email, role, logout } = useContext(AuthContext)

  // Used to redirect after logout
  const navigate = useNavigate()

  // Handle logout
  const handleLogout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    )

    if (!confirmed) return

    logout()
    navigate('/login')
  }

  // Reusable styling for navigation links
  const navLinkStyle = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo and navigation */}
        <div className="flex items-center gap-8">

          <div className="text-xl font-bold text-blue-600">
            TaskFlow
          </div>

          <div className="flex items-center gap-2">

            <NavLink
              to="/dashboard"
              className={navLinkStyle}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={navLinkStyle}
            >
              Tasks
            </NavLink>

            {/* Only ADMIN can see User Management */}
            {role === 'ADMIN' && (
              <NavLink
                to="/users"
                className={navLinkStyle}
              >
                Users
              </NavLink>
            )}

          </div>
        </div>

        {/* User information and logout */}
        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-gray-800">
              {email}
            </p>

            <p className="text-xs text-gray-500">
              {role}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  )
}

export default Navbar