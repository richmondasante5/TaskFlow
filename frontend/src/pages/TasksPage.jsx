import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService'

import TaskForm from '../components/TaskForm'
import TaskTable from '../components/TaskTable'
import EditTaskModal from '../components/EditTaskModal'
import Navbar from '../components/Navbar'

function TasksPage() {
  // Get authenticated user information and logout function
  // from the shared AuthContext
  const { token, email, role, logout } = useContext(AuthContext)

  // Stores all tasks retrieved from the backend
  const [tasks, setTasks] = useState([])

  // ============================
  // Create Task State
  // ============================

  // Stores the values entered in the create-task form
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // ============================
  // Edit Task State
  // ============================

  // Stores the task selected for editing
  // null means the edit modal is closed
  const [editingTask, setEditingTask] = useState(null)

  // Stores values displayed inside the edit modal
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskDescription, setEditTaskDescription] = useState('')
  const [editStatus, setEditStatus] = useState('PENDING')

  // ============================
  // UI State
  // ============================

  // Controls the loading message while tasks are being retrieved
  const [loading, setLoading] = useState(true)

  // Stores errors that should be shown to the user
  const [errorMessage, setErrorMessage] = useState('')

  // Stores the current task search text
  const [searchTerm, setSearchTerm] = useState('')

  // Used to navigate between React routes
  const navigate = useNavigate()

  // ============================
  // Load Tasks
  // ============================

  // Load tasks whenever a valid token becomes available
  useEffect(() => {
    if (token) {
      loadTasks()
    }
  }, [token])

  // Retrieve all tasks from the Spring Boot backend
  const loadTasks = async () => {
    try {
      setLoading(true)
      setErrorMessage('')

      const response = await getAllTasks(token)

      // Support either:
      // [...]
      // or
      // { tasks: [...] }
      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks

      // Make sure tasks state always contains an array
      setTasks(Array.isArray(taskData) ? taskData : [])
    } catch (error) {
      console.error('Failed to load tasks:', error)

      setTasks([])
      setErrorMessage('Unable to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  // ============================
  // Create Task
  // ============================

  const handleCreateTask = async (event) => {
    // Prevent browser refresh
    event.preventDefault()

    try {
      setErrorMessage('')

      // Build task object to send to backend
      const newTask = {
        taskName,
        taskDescription,
      }

      // Send POST request
      await createTask(newTask, token)

      // Clear form
      setTaskName('')
      setTaskDescription('')

      // Refresh tasks
      await loadTasks()
    } catch (error) {
      console.error('Failed to create task:', error)
      setErrorMessage('Unable to create task.')
    }
  }

  // ============================
  // Edit Task
  // ============================

  // Open modal and copy selected task data into edit state
  const handleEditClick = (task) => {
    setEditingTask(task)

    setEditTaskName(task.taskName ?? '')
    setEditTaskDescription(task.taskDescription ?? '')
    setEditStatus(task.status ?? 'PENDING')
  }

  // Close modal and reset edit state
  const handleCancelEdit = () => {
    setEditingTask(null)

    setEditTaskName('')
    setEditTaskDescription('')
    setEditStatus('PENDING')
  }

  // Update selected task
  const handleUpdateTask = async () => {
    // Stop if no task is selected
    if (!editingTask) return

    try {
      setErrorMessage('')

      // Keep existing properties but replace edited values
      const updatedTask = {
        ...editingTask,
        taskName: editTaskName,
        taskDescription: editTaskDescription,
        status: editStatus,
      }

      await updateTask(
        editingTask.id,
        updatedTask,
        token
      )

      // Close modal
      handleCancelEdit()

      // Refresh tasks
      await loadTasks()
    } catch (error) {
      console.error('Failed to update task:', error)
      setErrorMessage('Unable to update task.')
    }
  }

  // ============================
  // Delete Task
  // ============================

  const handleDeleteTask = async (taskId) => {
    // Ask before permanently deleting the task
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?\n\nThis action cannot be undone.'
    )

    // Stop if user clicks Cancel
    if (!confirmed) return

    try {
      setErrorMessage('')

      // Send DELETE request
      await deleteTask(taskId, token)

      // Refresh tasks
      await loadTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
      setErrorMessage('Unable to delete task.')
    }
  }

  // ============================
  // Logout
  // ============================

  const handleLogout = () => {
    // Ask before logging out
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    )

    if (!confirmed) return

    // Clear authentication data
    logout()

    // Return to login page
    navigate('/login')
  }

  // ============================
  // Search Tasks
  // ============================

  // Filter tasks using task name or description
  const filteredTasks = tasks.filter((task) => {
    // Convert search text to lowercase
    // so search is not case-sensitive
    const search = searchTerm.toLowerCase()

    return (
      task.taskName?.toLowerCase().includes(search) ||
      task.taskDescription?.toLowerCase().includes(search)
    )
  })

  return (
    <>
      {/* Shared navigation for authenticated pages */}
      <Navbar />

      {/* Main Tasks page container */}
      <div className="min-h-screen bg-gray-50 p-6 md:p-8">

        {/* ============================
            Page Header
        ============================ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, update and manage your tasks.
          </p>

          {/* User information from AuthContext */}
          <p className="mt-2 text-sm text-gray-600">
            {email} · {role}
          </p>
        </div>

        {/* ============================
            Error Message
        ============================ */}
        {errorMessage && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* ============================
            Create Task
        ============================ */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Create Task
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new task to TaskFlow.
            </p>
          </div>

          <TaskForm
            taskName={taskName}
            setTaskName={setTaskName}
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            handleCreateTask={handleCreateTask}
          />

        </div>

        {/* ============================
            All Tasks + Search + Table
        ============================ */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* All Tasks header + search */}
          <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">

            {/* Section title */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View, update or delete tasks.
              </p>
            </div>

            {/* Search box */}
            <div className="w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Loading state */}
          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Loading tasks...
            </div>

          ) : filteredTasks.length === 0 ? (

            // Empty/search result state
            <div className="px-6 py-12 text-center">
              <p className="font-medium text-gray-700">
                No matching tasks found.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try searching with a different task name or description.
              </p>
            </div>

          ) : (

            // Display filtered tasks
            <TaskTable
              tasks={filteredTasks}
              handleEditClick={handleEditClick}
              handleDeleteTask={handleDeleteTask}
            />

          )}

        </div>

        {/* ============================
            Edit Task Modal
        ============================ */}

        {/* Modal appears only when a task is selected */}
        {editingTask && (
          <EditTaskModal
            editTaskName={editTaskName}
            setEditTaskName={setEditTaskName}
            editTaskDescription={editTaskDescription}
            setEditTaskDescription={setEditTaskDescription}
            editStatus={editStatus}
            setEditStatus={setEditStatus}
            handleUpdateTask={handleUpdateTask}
            handleCancelEdit={handleCancelEdit}
          />
        )}

      </div>
    </>
  )
}

export default TasksPage