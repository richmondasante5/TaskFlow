import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAllTasks } from '../services/taskService'

function DashboardPage() {
  // Get the authenticated user's details from the AuthContext
  // These values are needed to access protected backend endpoints
  const { token, email, role } = useContext(AuthContext)

  // Store tasks retrieved from the backend
  const [tasks, setTasks] = useState([])

  // Store error message if dashboard data fails to load
  const [errorMessage, setErrorMessage] = useState('')

  // Load dashboard data only after the user has been authenticated
  useEffect(() => {
    if (token) {
      loadDashboardData()
    }
  }, [token])

  // Retrieve all tasks from the backend
  const loadDashboardData = async () => {
    try {
      // Clear any previous error message
      setErrorMessage('')

      // Send request to the backend
      const response = await getAllTasks(token)

      // Ensure the backend returned an array of tasks.
      // Some APIs return the array directly while others wrap it
      // inside an object (e.g. { tasks: [...] }).
      const taskData = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks

      // Prevent runtime errors if the backend response is invalid
      if (!Array.isArray(taskData)) {
        throw new Error('Invalid task data received from backend.')
      }

      // Update the dashboard with the retrieved tasks
      setTasks(taskData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)

      // Reset tasks and display an error message to the user
      setTasks([])
      setErrorMessage('Unable to load dashboard data.')
    }
  }

  // Calculate task statistics for the dashboard
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

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome {email}</h2>
      <p>Role: {role}</p>

      {errorMessage && <p>{errorMessage}</p>}

      <hr />

      <h2>Task Summary</h2>

      <div>
        <p>Total Tasks: {totalTasks}</p>
        <p>Pending Tasks: {pendingTasks}</p>
        <p>Started Tasks: {startedTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>
    </div>
  )
}

export default DashboardPage