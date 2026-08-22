function EditUserModal({
  editFirstName,
  setEditFirstName,
  editLastName,
  setEditLastName,
  editPhone,
  setEditPhone,
  editEmail,
  setEditEmail,
  editRole,
  setEditRole,
  handleUpdateUser,
  handleCancelEdit,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="shrink-0 border-b border-gray-200 px-6 py-5">

          <h2 className="text-xl font-bold text-gray-900">
            Edit User
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the user's account information.
          </p>

        </div>

        {/* Form fields */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">

          {/* First name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              value={editFirstName}
              onChange={(event) =>
                setEditFirstName(event.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Last name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              value={editLastName}
              onChange={(event) =>
                setEditLastName(event.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              value={editPhone}
              onChange={(event) =>
                setEditPhone(event.target.value)
              }
              pattern="[0-9]+"
              inputMode="numeric"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-gray-500">
              Enter digits only.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={editEmail}
              onChange={(event) =>
                setEditEmail(event.target.value)
              }
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
              value={editRole}
              onChange={(event) =>
                setEditRole(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="USER">User</option>
              <option value="DEVELOPER">Developer</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

        </div>

        {/* Actions */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">

          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdateUser}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}

export default EditUserModal