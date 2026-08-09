import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAllTasks } from '../services/taskService'

function DashboardPage() {
  // Get authenticated user information from the shared AuthContext
  const { token, email, role } = useContext(AuthContext)

  // Store tasks returned by the backend
  const [tasks, setTasks] = useState([])

  // Store any error message that occurs while loading dashboard data
  const [errorMessage, setErrorMessage] = useState('')

  // Load dashboard data by default whenever a valid token is available
  useEffect(() => {
    if (token) {
      loadDashboardData()
    }
  }, [token])

  // Retrieve tasks from the Spring Boot backend
  const loadDashboardData = async () => {
    try {
      // Clear any previous error before making a new request
      setErrorMessage('')

      const response = await getAllTasks(token)

      // Support either:
      // 1. A direct array response: [...]
      // 2. A wrapped response: { tasks: [...] }
      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks

      // Prevent runtime errors if the backend returns unexpected data
      if (!Array.isArray(taskData)) {
        throw new Error('Invalid task data received from backend.')
      }

      // Updating state causes React to re-render the dashboard
      setTasks(taskData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)

      // Keep the UI in a safe state if loading fails
      setTasks([])
      setErrorMessage('Unable to load dashboard data.')
    }
  }

  // Calculate dashboard statistics from the tasks state
  const totalTasks = tasks.length

  const pendingTasks = tasks.filter(
    (task) => task.status === 'PENDING'
  ).length

  const startedTasks = tasks.filter(
    (task) => task.status === 'STARTED'
  ).length

  const completedTasks = tasks.filter(
    (task) => task.status === 'COMPLETED'
  ).length

  // Return Tailwind classes based on a task's status
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
    // Main dashboard container
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      {/* Page header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          {/* Email and role come from AuthContext */}
          <p className="mt-1 text-gray-500">
            Welcome back, {email}
          </p>
        </div>

        {/* Logged-in user's role */}
        <div className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          {role}
        </div>

      </div>

      {/* Display API error if dashboard data cannot be loaded */}
      {errorMessage && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Task statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Total Tasks
          </p>

          <p className="mt-3 text-3xl font-bold text-gray-900">
            {totalTasks}
          </p>
        </div>

        {/* Pending tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Pending
          </p>

          <p className="mt-3 text-3xl font-bold text-yellow-600">
            {pendingTasks}
          </p>
        </div>

        {/* Started tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            In Progress
          </p>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {startedTasks}
          </p>
        </div>

        {/* Completed tasks */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Completed
          </p>

          <p className="mt-3 text-3xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

      </div>

      {/* Recent tasks section */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick overview of your latest tasks.
          </p>
        </div>

        {/* Conditional rendering:
            Show a message when there are no tasks,
            otherwise display the task list.
        */}
        {tasks.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-500">
            No tasks available yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">

            {/* Only show the first 5 tasks on the dashboard */}
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>
                  <h3 className="font-medium text-gray-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {task.description || 'No description provided'}
                  </p>
                </div>

                {/* Status badge */}
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default DashboardPage