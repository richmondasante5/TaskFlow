function EditTaskModal({
  // Edit form state passed from TasksPage
  editTaskName,
  setEditTaskName,
  editTaskDescription,
  setEditTaskDescription,
  editStatus,
  setEditStatus,

  // Functions passed from TasksPage
  handleUpdateTask,
  handleCancelEdit,
}) {
  return (
    // Dark overlay covering the page while the modal is open
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      {/* Modal container */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

        {/* Modal heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Task
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the task information below.
          </p>
        </div>

        {/* Edit fields */}
        <div className="space-y-5">

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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={editStatus}
              onChange={(event) =>
                setEditStatus(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="PENDING">Pending</option>
              <option value="STARTED">Started</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

        </div>

        {/* Modal action buttons */}
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdateTask}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditTaskModal