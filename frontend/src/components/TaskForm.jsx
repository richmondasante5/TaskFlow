function TaskForm({
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  handleCreateTask,
}) {
  return (
    <div>
      <h2>Create Task</h2>

      <form onSubmit={handleCreateTask}>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Task Description</label>
          <textarea
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            required
          />
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  )
}

export default TaskForm