import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  assignTaskToUser,
} from '../services/taskService'
import { getAllUsers } from '../services/userService'
import TaskForm from '../components/TaskForm'
import TaskTable from '../components/TaskTable'

function TasksPage() {
  // Get logged-in user data from AuthContext
  const { token, email, role, logout } = useContext(AuthContext)

  // Stores tasks from backend
  const [tasks, setTasks] = useState([])

  // Stores users from backend for task assignment
  const [users, setUsers] = useState([])

  // Create task form state
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Edit task state
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskDescription, setEditTaskDescription] = useState('')
  const [editStatus, setEditStatus] = useState('PENDING')

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Used for page navigation
  const navigate = useNavigate()

  // Runs once when TasksPage loads
  useEffect(() => {
    loadTasks()
    loadUsers()
  }, [])

  // Load all tasks from Spring Boot
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

  // Load all users for assignment dropdown
  const loadUsers = async () => {
    try {
      const response = await getAllUsers(token)
      setUsers(response.data)
    } catch (error) {
      setErrorMessage('Unable to load users.')
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

  // Put task into edit mode
  const handleEditClick = (task) => {
    setEditingTaskId(task.id)
    setEditTaskName(task.taskName)
    setEditTaskDescription(task.taskDescription)
    setEditStatus(task.status)
  }

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTaskId(null)
    setEditTaskName('')
    setEditTaskDescription('')
    setEditStatus('PENDING')
  }

  // Update selected task
  const handleUpdateTask = async (task) => {
    try {
      setErrorMessage('')

      const updatedTask = {
        ...task,
        taskName: editTaskName,
        taskDescription: editTaskDescription,
        status: editStatus,
      }

      await updateTask(task.id, updatedTask, token)

      handleCancelEdit()
      loadTasks()
    } catch (error) {
      setErrorMessage('Unable to update task.')
    }
  }

  // Assign task to selected user
  const handleAssignTask = async (taskId, userId) => {
    if (!userId) return

    try {
      setErrorMessage('')

      await assignTaskToUser(taskId, userId, token)

      loadTasks()
    } catch (error) {
      setErrorMessage('Unable to assign task.')
    }
  }

  // Delete task after confirmation
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmed) return

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

      <TaskForm
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        handleCreateTask={handleCreateTask}
      />

      <hr />

      {loading && <p>Loading tasks...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {!loading && (
        <TaskTable
          tasks={tasks}
          users={users}
          editingTaskId={editingTaskId}
          editTaskName={editTaskName}
          setEditTaskName={setEditTaskName}
          editTaskDescription={editTaskDescription}
          setEditTaskDescription={setEditTaskDescription}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          handleEditClick={handleEditClick}
          handleUpdateTask={handleUpdateTask}
          handleCancelEdit={handleCancelEdit}
          handleDeleteTask={handleDeleteTask}
          handleAssignTask={handleAssignTask}
        />
      )}
    </div>
  )
}

export default TasksPage