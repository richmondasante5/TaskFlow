function EditTaskModal({
  editTaskName,
  setEditTaskName,
  editTaskDescription,
  setEditTaskDescription,
  editStatus,
  setEditStatus,

  users,
  editAssignedUserId,
  setEditAssignedUserId,
  role,

  handleUpdateTask,
  handleCancelEdit,
}) {
  return (
    // Full-screen dark overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">

      {/* Modal container */}
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ============================
            Modal Header
        ============================ */}
        <div className="shrink-0 border-b border-gray-200 px-5 py-4 sm:px-6 sm:py-5">

          <h2 className="text-xl font-bold text-gray-900">
            Update Task
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Modify the task information and save your changes.
          </p>

        </div>

        {/* ============================
            Scrollable Modal Content
        ============================ */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:space-y-5 sm:px-6 sm:py-6">

          {/* Task Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Task Name
            </label>

            <input
              type="text"
              value={editTaskName}
              onChange={(event) =>
                setEditTaskName(event.target.value)
              }
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows="4"
              value={editTaskDescription}
              onChange={(event) =>
                setEditTaskDescription(event.target.value)
              }
              required
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={editStatus}
              onChange={(event) =>
                setEditStatus(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="PENDING">
                Pending
              </option>

              <option value="STARTED">
                Started
              </option>

              <option value="COMPLETED">
                Completed
              </option>
            </select>
          </div>

          {/* ============================
              Task Assignment
              ADMIN only
          ============================ */}
          {role === 'ADMIN' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Assigned To
              </label>

              <select
                value={editAssignedUserId}
                onChange={(event) =>
                  setEditAssignedUserId(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Not Assigned
                </option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.email}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-gray-500">
                Select the user responsible for this task.
              </p>
            </div>
          )}

        </div>

        {/* ============================
            Modal Footer
        ============================ */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="button"
            onClick={handleUpdateTask}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  )
}

export default EditTaskModal