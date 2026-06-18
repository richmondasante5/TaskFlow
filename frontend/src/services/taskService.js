import axios from 'axios'

// Backend task API base URL
const API_URL = 'http://localhost:8080/tasks'

// Get all tasks from backend
export const getAllTasks = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Create a new task in backend
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

// Assign a task to a user
export const assignTaskToUser = async (taskId, userId, token) => {
  return await axios.put(`${API_URL}/${taskId}/assign/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}