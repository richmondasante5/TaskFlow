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

  // Used to navigate between React routes
  const navigate = useNavigate()

  // ============================
  // Load Tasks
  // ============================

  // Load tasks when the authenticated token becomes available
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
    // Prevent the browser from refreshing when the form is submitted
    event.preventDefault()

    try {
      setErrorMessage('')

      // Build the object that will be sent to Spring Boot
      const newTask = {
        taskName,
        taskDescription,
      }

      // Send POST request through taskService
      await createTask(newTask, token)

      // Clear the form after successful creation
      setTaskName('')
      setTaskDescription('')

      // Refresh tasks so the new task appears immediately
      await loadTasks()
    } catch (error) {
      console.error('Failed to create task:', error)
      setErrorMessage('Unable to create task.')
    }
  }

  // ============================
  // Edit Task
  // ============================

  // Open the modal and copy the selected task into edit state
  const handleEditClick = (task) => {
    setEditingTask(task)

    setEditTaskName(task.taskName ?? '')
    setEditTaskDescription(task.taskDescription ?? '')
    setEditStatus(task.status ?? 'PENDING')
  }

  // Close the edit modal and clear its state
  const handleCancelEdit = () => {
    setEditingTask(null)

    setEditTaskName('')
    setEditTaskDescription('')
    setEditStatus('PENDING')
  }

  // Send updated task information to the backend
  const handleUpdateTask = async () => {
    // Do nothing if no task is currently selected
    if (!editingTask) return

    try {
      setErrorMessage('')

      // Keep the existing task properties,
      // but replace the fields the user edited
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

      // Close modal after successful update
      handleCancelEdit()

      // Refresh table with latest backend data
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
    // Ask the user before permanently deleting the task
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?\n\nThis action cannot be undone.'
    )

    // Stop if the user selects Cancel
    if (!confirmed) return

    try {
      setErrorMessage('')

      // Send DELETE request through taskService
      await deleteTask(taskId, token)

      // Refresh tasks after successful deletion
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
    // Clear authentication information from AuthContext
    logout()

    // Return user to the login route
    navigate('/login')
  }

  return (
    // Main Tasks page container
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      {/* ============================
          Page Header
      ============================ */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, update and manage your tasks.
          </p>

          {/* User information comes from AuthContext */}
          <p className="mt-2 text-sm text-gray-600">
            {email} · {role}
          </p>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-fit rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
        >
          Logout
        </button>

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
          Task Table
      ============================ */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View, update or delete tasks.
          </p>
        </div>

        {/* Show loading state while request is running */}
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">
            Loading tasks...
          </div>

        ) : tasks.length === 0 ? (

          // Show empty state when there are no tasks
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-gray-700">
              No tasks available.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first task using the form above.
            </p>
          </div>

        ) : (

          // Pass task data and action functions to TaskTable
          <TaskTable
            tasks={tasks}
            handleEditClick={handleEditClick}
            handleDeleteTask={handleDeleteTask}
          />

        )}

      </div>

      {/* ============================
          Edit Task Modal
      ============================ */}

      {/* Modal appears only when editingTask contains a task */}
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
  )
}

export default TasksPage