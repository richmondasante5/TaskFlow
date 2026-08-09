function EditTaskModal({
  // Current values for the task being edited
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
    // Full-screen overlay behind the modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      {/* Modal container */}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        {/* Modal header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit Task
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the task details and save your changes.
          </p>
        </div>

        {/* Edit task form */}
        <div className="space-y-4">

          {/* Task name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Task Name
            </label>

            <input
              type="text"
              value={editTaskName}
              onChange={(event) =>
                setEditTaskName(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Task description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={editTaskDescription}
              onChange={(event) =>
                setEditTaskDescription(event.target.value)
              }
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Task status */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={editStatus}
              onChange={(event) =>
                setEditStatus(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="PENDING">Pending</option>
              <option value="STARTED">Started</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        {/* Modal actions */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Close modal without saving */}
          <button
            type="button"
            onClick={handleCancelEdit}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Save task changes */}
          <button
            type="button"
            onClick={handleUpdateTask}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  )
}

export default EditTaskModal