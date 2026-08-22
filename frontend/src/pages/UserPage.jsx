import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import {
  getAllUsers,
  createUser,
  updateUserData,
  deleteUser,
} from '../services/userService'

import Navbar from '../components/Navbar'
import UserForm from '../components/UserForm'
import EditUserModal from '../components/EditUserModal'

function UserPage() {

  // Get authentication data from AuthContext
  const { token, role } = useContext(AuthContext)

  // User list state
  const [users, setUsers] = useState([])

  // Create user form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('USER')

  // User currently selected for editing
  const [editingUser, setEditingUser] = useState(null)

  // Edit user state
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState('USER')

  // UI state
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // Load users when page opens or authentication changes
  useEffect(() => {

    if (token && role === 'ADMIN') {
      loadUsers()
    }

  }, [token, role])


  // Get all users from backend
  const loadUsers = async () => {

    try {

      setLoading(true)
      setErrorMsg('')

      const response = await getAllUsers(token)

      // Store backend user list in state
      setUsers(
        Array.isArray(response.data)
          ? response.data
          : []
      )

    } catch (error) {

      console.error('Failed to load users:', error)

      setUsers([])
      setErrorMsg('Failed to load users.')

    } finally {

      setLoading(false)

    }
  }


  // Create a new user
  const handleCreateUser = async (event) => {

    event.preventDefault()

    try {

      setErrorMsg('')

      // Data sent to backend
      const userData = {
        email,
        password,
        role: userRole,
      }

      await createUser(
        userData,
        token
      )

      // Clear form after successful creation
      setEmail('')
      setPassword('')
      setUserRole('USER')

      // Reload users so new user appears
      await loadUsers()

    } catch (error) {

      console.error('Failed to create user:', error)

      setErrorMsg('Unable to create user.')

    }
  }


  // Open edit modal
  const handleEditClick = (user) => {

    setEditingUser(user)

    // Fill modal with current user information
    setEditEmail(user.email ?? '')
    setEditRole(user.role ?? 'USER')
  }


  // Close edit modal
  const handleCancelEdit = () => {

    setEditingUser(null)

    setEditEmail('')
    setEditRole('USER')
  }


  // Update selected user
  const handleUpdateUser = async () => {

    if (!editingUser) return

    try {

      setErrorMsg('')

      // Keep existing user data and replace edited values
      const updatedUser = {
        ...editingUser,
        email: editEmail,
        role: editRole,
      }

      await updateUserData(
        editingUser.id,
        updatedUser,
        token
      )

      // Close modal
      handleCancelEdit()

      // Refresh users
      await loadUsers()

    } catch (error) {

      console.error('Failed to update user:', error)

      setErrorMsg('Unable to update user.')

    }
  }


  // Delete selected user
  const handleDeleteUser = async (userId) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this user?\n\nThis action cannot be undone.'
    )

    if (!confirmed) return

    try {

      setErrorMsg('')

      await deleteUser(
        userId,
        token
      )

      // Refresh users after deletion
      await loadUsers()

    } catch (error) {

      console.error('Failed to delete user:', error)

      setErrorMsg('Unable to delete user.')

    }
  }


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 pb-8 pt-28 md:px-8">

        {/* Page header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            User Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage TaskFlow users.
          </p>

        </div>


        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        )}


        {/* Create user */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Add User
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new TaskFlow user and assign a role.
            </p>

          </div>

          <UserForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            userRole={userRole}
            setUserRole={setUserRole}
            handleCreateUser={handleCreateUser}
          />

        </div>


        {/* Users table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">

            <h2 className="text-lg font-semibold text-gray-900">
              All Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View, update or delete TaskFlow users.
            </p>

          </div>


          {/* Loading users */}
          {loading ? (

            <div className="px-6 py-12 text-center text-gray-500">
              Loading users...
            </div>

          ) : users.length === 0 ? (

            <div className="px-6 py-12 text-center text-gray-500">
              No users found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100 bg-white">

                  {users.map((user) => (

                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* User email */}
                      <td className="px-6 py-5 text-sm font-medium text-gray-900">
                        {user.email}
                      </td>


                      {/* User role */}
                      <td className="px-6 py-5">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {user.role}
                        </span>

                      </td>


                      {/* Actions */}
                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEditClick(user)
                            }
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteUser(user.id)
                            }
                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* Edit user modal */}
        {editingUser && (

          <EditUserModal
            editEmail={editEmail}
            setEditEmail={setEditEmail}
            editRole={editRole}
            setEditRole={setEditRole}
            handleUpdateUser={handleUpdateUser}
            handleCancelEdit={handleCancelEdit}
          />

        )}

      </div>
    </>
  )
}

export default UserPage