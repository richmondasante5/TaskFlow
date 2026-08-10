function TaskTable({
  // List of tasks received from TasksPage
  tasks,

  // Functions received from TasksPage
  handleEditClick,
  handleDeleteTask,
}) {

  // ============================
  // Status Styling
  // ============================

  // Return different Tailwind styles depending on task status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700'

      case 'STARTED':
        return 'bg-blue-100 text-blue-700'

      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    // Allows horizontal scrolling on smaller screens
    <div className="overflow-x-auto">

      {/* Task table */}
      <table className="min-w-full divide-y divide-gray-200">

        {/* ============================
            Table Header
        ============================ */}
        <thead className="bg-gray-50">
          <tr>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Task
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Assigned To
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>

          </tr>
        </thead>

        {/* ============================
            Table Body
        ============================ */}
        <tbody className="divide-y divide-gray-100 bg-white">

          {/* Convert every task object into a table row */}
          {tasks.map((task) => (
            <tr
              // ID is still used internally by React
              // but we don't display it to the user
              key={task.id}
              className="transition hover:bg-gray-50"
            >

              {/* Task Name */}
              <td className="whitespace-nowrap px-6 py-5">
                <p className="font-semibold text-gray-900">
                  {task.taskName}
                </p>
              </td>

              {/* Task Description */}
              <td className="max-w-md px-6 py-5 text-sm text-gray-600">
                {task.taskDescription || 'No description provided'}
              </td>

              {/* Task Status */}
              <td className="whitespace-nowrap px-6 py-5">

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>

              </td>

              {/* Assigned User */}
              <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">

                {task.assignedTo?.email ? (
                  <span className="font-medium text-gray-700">
                    {task.assignedTo.email}
                  </span>
                ) : (
                  <span className="text-gray-400">
                    Not assigned
                  </span>
                )}

              </td>

              {/* ============================
                  Actions
              ============================ */}
              <td className="whitespace-nowrap px-6 py-5 text-right">

                <div className="flex justify-end gap-2">

                  {/* EDIT
                      Send the whole selected task back to TasksPage.

                      TasksPage then stores it in editingTask.

                      When editingTask contains a task,
                      EditTaskModal is displayed.
                  */}
                  <button
                    type="button"
                    onClick={() => handleEditClick(task)}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    Edit
                  </button>

                  {/* DELETE
                      Send only the task ID back to TasksPage.

                      TasksPage asks for confirmation before
                      calling the backend DELETE endpoint.
                  */}
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
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
  )
}

export default TaskTable