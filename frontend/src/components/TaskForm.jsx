function TaskForm({
  // Task name state
  taskName,
  setTaskName,

  // Task description state
  taskDescription,
  setTaskDescription,

  // Assignment data
  users,
  assignedUserId,
  setAssignedUserId,
  role,

  // Function that creates a task
  handleCreateTask,
}) {
  return (
    <form
      onSubmit={handleCreateTask}
      className="space-y-5"
    >
      {/* Task Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Task Name
        </label>

        <input
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Enter task name..."
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Task Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Task Description
        </label>

        <textarea
          rows="4"
          value={taskDescription}
          onChange={(event) =>
            setTaskDescription(event.target.value)
          }
          placeholder="Describe the task..."
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Only ADMIN can assign a task during creation */}
      {role === 'ADMIN' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Assign To
          </label>

          <select
            value={assignedUserId}
            onChange={(event) =>
              setAssignedUserId(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {/* Task can still be created without an assignee */}
            <option value="">
              Not Assigned
            </option>

            {/* Convert users into dropdown options */}
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
            Optional: assign this task to a user now.
          </p>
        </div>
      )}

      {/* Create button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm