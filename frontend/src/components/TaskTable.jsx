function TaskTable({
  // List of tasks coming from TasksPage
  tasks,

  // Functions passed from TasksPage
  handleEditClick,
  handleDeleteTask,
}) {
  // Return Tailwind styles based on task status
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
    // Allow horizontal scrolling on smaller screens
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">

        {/* Table headings */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              ID
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Task
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Assigned To
            </th>

            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">

          {/* Convert every task object into a table row */}
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="transition hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                #{task.id}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                <p className="font-medium text-gray-900">
                  {task.taskName}
                </p>
              </td>

              <td className="max-w-sm px-6 py-4 text-sm text-gray-600">
                {task.taskDescription || 'No description'}
              </td>

              <td className="whitespace-nowrap px-6 py-4">
                {/* Display task status using a visual badge */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                {task.assignedTo?.email || 'Not Assigned'}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-right">
                <div className="flex justify-end gap-2">

                  {/* Open the edit modal for this task */}
                  <button
                    type="button"
                    onClick={() => handleEditClick(task)}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                  >
                    Edit
                  </button>

                  {/* TasksPage handles the delete confirmation */}
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
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