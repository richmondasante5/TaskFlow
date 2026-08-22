import API from '../config/axios.js'

// Creates a new user and sends the JWT token for authentication
export const createUser = async (userData, token) => {
  return await API.post('/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


// Gets all users from the backend using the logged-in user's token
export const getAllUsers = async (token) => {
  return await API.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


// Updates a specific user using their ID and the new user data
export const updateUserData = async (userId, userData, token) => {
  return await API.put(`/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


// Deletes a specific user using their ID
export const deleteUser = async (userId, token) => {
  return await API.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}


// Sends email and password to the backend for authentication
// No token is needed because the user has not logged in yet
export const loginUser = async (userData) => {
  return await API.post('/users/login', userData)
}