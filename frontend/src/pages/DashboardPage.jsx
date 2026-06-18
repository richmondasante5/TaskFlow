import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getAllTasks } from '../services/taskService'

function DashboardPage() {
  // Get token from AuthContext so we can call protected backend endpoints
  const { token, email, role } = useContext(AuthContext)

  // Store tasks from backend
  const [tasks, setTasks] = useState([])

  // Store error message if task loading fails
  const [errorMessage, setErrorMessage] = useState('')

  // Load tasks when dashboard opens
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Get tasks from backend
  const loadDashboardData = async () => {
    try {
      const response = await getAllTasks(token)
      setTasks(response.data)
    } catch (error) {
      setErrorMessage('Unable to load dashboard data.')
    }
  }

  // Count tasks by status
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length
  const startedTasks = tasks.filter((task) => task.status === 'STARTED').length
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