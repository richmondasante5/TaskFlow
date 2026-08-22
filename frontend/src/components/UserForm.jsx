function UserForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  userRole,
  setUserRole,
  handleCreateUser,
}) {
  return (
    <form
      onSubmit={handleCreateUser}
      className="space-y-5"
    >

      {/* First and last name */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            placeholder="Enter first name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            placeholder="Enter last name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="user@taskflow.com"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Password */}
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
          placeholder="Enter temporary password"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role
        </label>

        <select
          value={userRole}
          onChange={(event) =>
            setUserRole(event.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="USER">
            User
          </option>

          <option value="DEVELOPER">
            Developer
          </option>

          <option value="MANAGER">
            Manager
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

    </form>
  )
}

export default UserForm