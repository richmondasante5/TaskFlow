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
import EditTaskModal from '../components/EditTaskModal'

function TasksPage() {
  // Get authenticated user information and logout function
  // from the shared AuthContext
  const { token, email, role, logout } = useContext(AuthContext)

  // Store tasks retrieved from the backend
  const [tasks, setTasks] = useState([])

  // Store users retrieved from the backend
  // These users are used when assigning tasks
  const [users, setUsers] = useState([])

  // Create task form state
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Store the task currently selected for editing
  // null means the edit modal is closed
  const [editingTask, setEditingTask] = useState(null)

  // Edit task form state
  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskDescription, setEditTaskDescription] = useState('')
  const [editStatus, setEditStatus] = useState('PENDING')

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Used to navigate between React routes
  const navigate = useNavigate()

  // Load tasks and users when the page first opens
  useEffect(() => {
    loadTasks()
    loadUsers()
  }, [])

  // Retrieve all tasks from the Spring Boot backend
  const loadTasks = async () => {
    try {
      setLoading(true)
      setErrorMessage('')

      const response = await getAllTasks(token)

      // Support either a direct array or wrapped task response
      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks

      setTasks(Array.isArray(taskData) ? taskData : [])
    } catch (error) {
      console.error('Failed to load tasks:', error)
      setErrorMessage('Unable to load tasks.')
    } finally {
      setLoading(false)
    }
  }

  // Retrieve users for the assignment dropdown
  const loadUsers = async () => {
    try {
      const response = await getAllUsers(token)

      const userData = Array.isArray(response.data)
        ? response.data
        : response.data?.users

      setUsers(Array.isArray(userData) ? userData : [])
    } catch (error) {
      console.error('Failed to load users:', error)

      // Do not stop task loading if user loading fails
      setUsers([])
    }
  }

  // Create a new task
  const handleCreateTask = async (event) => {
    event.preventDefault()

    try {
      setErrorMessage('')

      const newTask = {
        taskName,
        taskDescription,
      }

      await createTask(newTask, token)

      // Clear the form after successful creation
      setTaskName('')
      setTaskDescription('')

      await loadTasks()
    } catch (error) {
      console.error('Failed to create task:', error)
      setErrorMessage('Unable to create task.')
    }
  }

  // Open the edit modal and copy the selected task
  // values into the edit form state
  const handleEditClick = (task) => {
    setEditingTask(task)
    setEditTaskName(task.taskName ?? '')
    setEditTaskDescription(task.taskDescription ?? '')
    setEditStatus(task.status ?? 'PENDING')
  }

  // Close and reset the edit modal
  const handleCancelEdit = () => {
    setEditingTask(null)
    setEditTaskName('')
    setEditTaskDescription('')
    setEditStatus('PENDING')
  }

  // Update the task currently opened in the modal
  const handleUpdateTask = async () => {
    if (!editingTask) return

    try {
      setErrorMessage('')

      const updatedTask = {
        ...editingTask,
        taskName: editTaskName,
        taskDescription: editTaskDescription,
        status: editStatus,
      }

      await updateTask(editingTask.id, updatedTask, token)

      handleCancelEdit()
      await loadTasks()
    } catch (error) {
      console.error('Failed to update task:', error)
      setErrorMessage('Unable to update task.')
    }
  }

  // Assign a task to a selected user
  const handleAssignTask = async (taskId, userId) => {
    if (!userId) return

    try {
      setErrorMessage('')

      await assignTaskToUser(taskId, userId, token)

      await loadTasks()
    } catch (error) {
      console.error('Failed to assign task:', error)
      setErrorMessage('Unable to assign task.')
    }
  }

  // Ask the user for confirmation before deleting a task
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      'Delete this task?\n\nThis action cannot be undone.'
    )

    if (!confirmed) return

    try {
      setErrorMessage('')

      await deleteTask(taskId, token)

      await loadTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
      setErrorMessage('Unable to delete task.')
    }
  }

  // Clear authentication data and return to login
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    // Main Tasks page container
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage, assign, update and track your tasks.
          </p>

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

      {/* Error message */}
      {errorMessage && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Create task section */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Create Task
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add a new task to the system.
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

      {/* Task list section */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            All Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View and manage tasks currently stored in TaskFlow.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          // Empty state
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-gray-700">
              No tasks available.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first task using the form above.
            </p>
          </div>
        ) : (
          // Task table
          <TaskTable
            tasks={tasks}
            users={users}
            handleEditClick={handleEditClick}
            handleDeleteTask={handleDeleteTask}
            handleAssignTask={handleAssignTask}
          />
        )}
      </div>

      {/* Edit modal is rendered only when a task is selected */}
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