import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { getAllTasks, createTask, deleteTask } from '../services/taskService'

function TasksPage() {
  // Get authentication data from AuthContext
  const { token, email, role, logout } = useContext(AuthContext)

  // Store tasks from backend
  const [tasks, setTasks] = useState([])

  // Store create task form values
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Store loading and error states
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Used for navigation
  const navigate = useNavigate()

  // Load tasks when page opens
  useEffect(() => {
    loadTasks()
  }, [])

  // Get all tasks from backend
  const loadTasks = async () => {
    try {
      setLoading(true)
      setErrorMessage('')

      const response = await getAllTasks(token)
      setTasks(response.data)
    } catch (error) {
      setErrorMessage('Unable to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  // Create new task
  const handleCreateTask = async (event) => {
    event.preventDefault()

    try {
      setErrorMessage('')

      const newTask = {
        taskName,
        taskDescription,
      }

      await createTask(newTask, token)

      setTaskName('')
      setTaskDescription('')

      loadTasks()
    } catch (error) {
      setErrorMessage('Unable to create task.')
    }
  }

  // Delete selected task
  const handleDeleteTask = async (taskId) => {
    try {
      setErrorMessage('')

      await deleteTask(taskId, token)

      loadTasks()
    } catch (error) {
      setErrorMessage('Unable to delete task.')
    }
  }

  // Logout user
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Tasks Page</h1>

      <h2>Welcome {email}</h2>
      <p>Role: {role}</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

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

      <hr />

      <h2>Task List</h2>

      {loading && <p>Loading tasks...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!loading && tasks.length === 0 && <p>No tasks found.</p>}

      {!loading && tasks.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskName}</td>
                <td>{task.taskDescription}</td>
                <td>{task.status}</td>
                <td>
                  {task.assignedTo ? task.assignedTo.email : 'Not Assigned'}
                </td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TasksPage