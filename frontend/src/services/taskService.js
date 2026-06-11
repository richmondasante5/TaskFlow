import axios from 'axios'

// Backend task API base URL
const API_URL = 'http://localhost:8080/tasks'

// Get all tasks
export const getAllTasks = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Create a new task
export const createTask = async (taskData, token) => {
  return await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Update an existing task
export const updateTask = async (taskId, taskData, token) => {
  return await axios.put(`${API_URL}/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Delete a task
export const deleteTask = async (taskId, token) => {
  return await axios.delete(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}