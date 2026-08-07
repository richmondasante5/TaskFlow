import API from '../config/axios.js' // Axios instance with base URL and timeout configured

// Get all tasks from backend
export const getAllTasks = async (token) => {
  return await API.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Create a new task in backend
export const createTask = async (taskData, token) => {
  return await API.post('/tasks', taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Update an existing task
export const updateTask = async (taskId, taskData, token) => {
  return await API.put(`/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Delete a task
export const deleteTask = async (taskId, token) => {
  return await API.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Assign a task to a user
export const assignTaskToUser = async (taskId, userId, token) => {
  return await API.put(`/tasks/${taskId}/assign/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}