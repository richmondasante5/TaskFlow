import { useContext, useEffect, useState } from 'react'
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
import Navbar from '../components/Navbar'

function TasksPage() {
  // Get authenticated user information from AuthContext
  const { token, email, role } = useContext(AuthContext)

  // ============================
  // Main Data State
  // ============================

  // Stores tasks returned by backend
  const [tasks, setTasks] = useState([])

  // Stores users for task assignment
  // Only ADMIN loads this list
  const [users, setUsers] = useState([])

  // ============================
  // Create Task State
  // ============================

  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  // Stores user selected during task creation
  const [assignedUserId, setAssignedUserId] = useState('')

  // ============================
  // Edit Task State
  // ============================

  // Stores task currently selected for editing
  // null means modal is closed
  const [editingTask, setEditingTask] = useState(null)

  const [editTaskName, setEditTaskName] = useState('')
  const [editTaskDescription, setEditTaskDescription] = useState('')
  const [editStatus, setEditStatus] = useState('PENDING')

  // Stores selected assignee inside edit modal
  const [editAssignedUserId, setEditAssignedUserId] = useState('')

  // ============================
  // UI State
  // ============================

  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // ============================
  // Initial Page Load
  // ============================

  useEffect(() => {
    if (token) {
      // Every authenticated user can load tasks
      loadTasks()

      // Only ADMIN can load all users
      if (role === 'ADMIN') {
        loadUsers()
      }
    }
  }, [token, role])

  // ============================
  // Load Tasks
  // ============================

  const loadTasks = async () => {
    try {
      setLoading(true)
      setErrorMessage('')

      const response = await getAllTasks(token)

      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks

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
  // Load Users
  // ============================

  const loadUsers = async () => {
    try {
      const response = await getAllUsers(token)

      const userData = Array.isArray(response.data)
        ? response.data
        : response.data?.users

      setUsers(Array.isArray(userData) ? userData : [])
    } catch (error) {
      console.error('Failed to load users:', error)

      // User loading should not break the whole Tasks page
      setUsers([])
    }
  }

  // ============================
  // Create Task
  // ============================

  const handleCreateTask = async (event) => {
    event.preventDefault()

    try {
      setErrorMessage('')

      // Build task object
      const newTask = {
        taskName,
        taskDescription,
      }

      // Create task first
      const response = await createTask(newTask, token)

      // Try to get newly-created task ID
      // Supports:
      // { id: ... }
      // or
      // { task: { id: ... } }
      const createdTaskId =
        response.data?.id ??
        response.data?.task?.id

      // If ADMIN selected a user, assign the new task
      if (
        role === 'ADMIN' &&
        assignedUserId &&
        createdTaskId
      ) {
        await assignTaskToUser(
          createdTaskId,
          assignedUserId,
          token
        )
      }

      // Reset create form
      setTaskName('')
      setTaskDescription('')
      setAssignedUserId('')

      // Refresh task list
      await loadTasks()
    } catch (error) {
      console.error('Failed to create task:', error)

      setErrorMessage('Unable to create task.')
    }
  }

  // ============================
  // Open Edit Modal
  // ============================

  const handleEditClick = (task) => {
    setEditingTask(task)

    // Copy existing task values into edit state
    setEditTaskName(task.taskName ?? '')
    setEditTaskDescription(task.taskDescription ?? '')
    setEditStatus(task.status ?? 'PENDING')

    // Preselect current assignee if one exists
    setEditAssignedUserId(
      task.assignedTo?.id
        ? String(task.assignedTo.id)
        : ''
    )
  }

  // ============================
  // Close Edit Modal
  // ============================

  const handleCancelEdit = () => {
    setEditingTask(null)

    setEditTaskName('')
    setEditTaskDescription('')
    setEditStatus('PENDING')
    setEditAssignedUserId('')
  }

  // ============================
  // Update Task
  // ============================

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

      // Update normal task information
      await updateTask(
        editingTask.id,
        updatedTask,
        token
      )

      // ADMIN can also change task assignment
      if (
        role === 'ADMIN' &&
        editAssignedUserId
      ) {
        await assignTaskToUser(
          editingTask.id,
          editAssignedUserId,
          token
        )
      }

      // Close modal
      handleCancelEdit()

      // Refresh task list
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
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?\n\nThis action cannot be undone.'
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

  // ============================
  // Search Tasks
  // ============================

  const filteredTasks = tasks.filter((task) => {
    const search = searchTerm.toLowerCase()

    return (
      task.taskName?.toLowerCase().includes(search) ||
      task.taskDescription?.toLowerCase().includes(search)
    )
  })

  return (
    <>
      {/* Shared navigation */}
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 pb-8 pt-28 md:px-8">

        {/* ============================
            Page Header
        ============================ */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, assign, update and manage your tasks.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            {email} · {role}
          </p>
        </div>

        {/* Error message */}
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

            // Assignment props
            users={users}
            assignedUserId={assignedUserId}
            setAssignedUserId={setAssignedUserId}
            role={role}

            handleCreateTask={handleCreateTask}
          />

        </div>

        {/* ============================
            Tasks Table
        ============================ */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Header + Search */}
          <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                All Tasks
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                View, update or delete tasks.
              </p>
            </div>

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

          {/* Task results */}
          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Loading tasks...
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="px-6 py-12 text-center">

              <p className="font-medium text-gray-700">
                No matching tasks found.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try searching with a different task name or description.
              </p>

            </div>
          ) : (
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
        {editingTask && (
          <EditTaskModal
            editTaskName={editTaskName}
            setEditTaskName={setEditTaskName}
            editTaskDescription={editTaskDescription}
            setEditTaskDescription={setEditTaskDescription}
            editStatus={editStatus}
            setEditStatus={setEditStatus}

            // Assignment props
            users={users}
            editAssignedUserId={editAssignedUserId}
            setEditAssignedUserId={setEditAssignedUserId}
            role={role}

            handleUpdateTask={handleUpdateTask}
            handleCancelEdit={handleCancelEdit}
          />
        )}

      </div>
    </>
  )
}

export default TasksPage