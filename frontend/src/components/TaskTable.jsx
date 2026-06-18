function TaskTable({
  // List of tasks coming from TasksPage
  tasks,

  // ID of the task currently being edited
  editingTaskId,

  // Edit form values
  editTaskName,
  setEditTaskName,
  editTaskDescription,
  setEditTaskDescription,
  editStatus,
  setEditStatus,

  // Functions passed from TasksPage
  handleEditClick,
  handleUpdateTask,
  handleCancelEdit,
  handleDeleteTask,
}) {
  return (
    <div>
      <h2>Task List</h2>

      {/* Show message when there are no tasks */}
      {tasks.length === 0 && <p>No tasks found.</p>}

      {/* Show table only when tasks exist */}
      {tasks.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Loop through each task and create a table row */}
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>

                {/* If this task is being edited, show input; otherwise show text */}
                <td>
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(event) =>
                        setEditTaskName(event.target.value)
                      }
                    />
                  ) : (
                    task.taskName
                  )}
                </td>

                {/* If this task is being edited, show textarea; otherwise show description */}
                <td>
                  {editingTaskId === task.id ? (
                    <textarea
                      value={editTaskDescription}
                      onChange={(event) =>
                        setEditTaskDescription(event.target.value)
                      }
                    />
                  ) : (
                    task.taskDescription
                  )}
                </td>

                {/* If editing, allow status change; otherwise display status badge */}
                <td>
                  {editingTaskId === task.id ? (
                    <select
                      value={editStatus}
                      onChange={(event) => setEditStatus(event.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="STARTED">STARTED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  ) : (
                    <>
                      {task.status === 'PENDING' && <span>🟡 PENDING</span>}
                      {task.status === 'STARTED' && <span>🔵 STARTED</span>}
                      {task.status === 'COMPLETED' && (
                        <span>🟢 COMPLETED</span>
                      )}
                    </>
                  )}
                </td>

                {/* Show assigned user email if task is assigned */}
                <td>
                  {task.assignedTo ? task.assignedTo.email : 'Not Assigned'}
                </td>

                {/* Show Update/Cancel in edit mode, otherwise Edit/Delete */}
                <td>
                  {editingTaskId === task.id ? (
                    <>
                      <button onClick={() => handleUpdateTask(task)}>
                        Update
                      </button>

                      <button onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(task)}>
                        Edit
                      </button>

                      <button onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TaskTable