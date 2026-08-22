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

  // Authentication data
  const { token, role } = useContext(AuthContext)

  // User list
  const [users, setUsers] = useState([])

  // Create user form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState('USER')

  // User currently being edited
  const [editingUser, setEditingUser] = useState(null)

  // Edit user form state
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState('USER')

  // UI state
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // Load users when authentication data becomes available
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

      setUsers(
        Array.isArray(response.data)
          ? response.data
          : []
      )

    } catch (error) {
      console.error('Failed to load users:', error)

      setUsers([])
      setErrorMsg('Unable to load users.')

    } finally {
      setLoading(false)
    }
  }

  // Create a new user
  const handleCreateUser = async (event) => {
    event.preventDefault()

    try {
      setErrorMsg('')

      const userData = {
        firstName,
        lastName,
        phone,
        email,
        password,
        role: userRole,
      }

      await createUser(userData, token)

      // Clear form after successful creation
      setFirstName('')
      setLastName('')
      setPhone('')
      setEmail('')
      setPassword('')
      setUserRole('USER')

      // Refresh user list
      await loadUsers()

    } catch (error) {
      console.error(
        'Failed to create user:',
        error.response?.data || error
      )

      setErrorMsg(
        error.response?.data?.message ||
        'Unable to create user.'
      )
    }
  }

  // Open edit modal with current user information
  const handleEditClick = (user) => {
    setEditingUser(user)

    setEditFirstName(user.firstName ?? '')
    setEditLastName(user.lastName ?? '')
    setEditPhone(user.phone ?? '')
    setEditEmail(user.email ?? '')
    setEditRole(user.role ?? 'USER')
  }

  // Close edit modal
  const handleCancelEdit = () => {
    setEditingUser(null)

    setEditFirstName('')
    setEditLastName('')
    setEditPhone('')
    setEditEmail('')
    setEditRole('USER')
  }

  // Update selected user
  const handleUpdateUser = async () => {
    if (!editingUser) return

    try {
      setErrorMsg('')

      const updatedUser = {
        firstName: editFirstName,
        lastName: editLastName,
        phone: editPhone,
        email: editEmail,
        role: editRole,
      }

      await updateUserData(
        editingUser.id,
        updatedUser,
        token
      )

      handleCancelEdit()

      await loadUsers()

    } catch (error) {
      console.error(
        'Failed to update user:',
        error.response?.data || error
      )

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

      await deleteUser(userId, token)

      await loadUsers()

    } catch (error) {
      console.error(
        'Failed to delete user:',
        error.response?.data || error
      )

      setErrorMsg('Unable to delete user.')
    }
  }

  // Block non-admin users from User Management
  if (role !== 'ADMIN') {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-gray-50 px-6 pb-8 pt-28 md:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            You do not have permission to access User Management.
          </div>
        </div>
      </>
    )
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
              Create a new account and assign a role.
            </p>
          </div>

          <UserForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
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

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      First Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Last Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
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

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-900">
                        {user.firstName || '-'}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-900">
                        {user.lastName || '-'}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                        {user.phone || '-'}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-gray-900">
                        {user.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {user.role}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => handleEditClick(user)}
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
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
            editFirstName={editFirstName}
            setEditFirstName={setEditFirstName}
            editLastName={editLastName}
            setEditLastName={setEditLastName}
            editPhone={editPhone}
            setEditPhone={setEditPhone}
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