import API from '../config/axios.js'

// Create a new user
export const createUser = async (userData, token) => {

  return await API.post('/users', userData, {
    headers: {
      // Send JWT so the backend can authenticate the request
      Authorization: `Bearer ${token}`
    }
  })

}


// Get all users
export const getAllUsers = async (token) => {

  return await API.get('/users', {
    headers: {
      // Send JWT so the backend can authenticate the request
      Authorization: `Bearer ${token}`
    }
  })

}


// Update an existing user
export const updateUserData = async (userId, userData, token) => {

  return await API.put(`/users/${userId}`, userData, {
    headers: {
      // Send JWT so the backend can authenticate the request
      Authorization: `Bearer ${token}`
    }
  })

}


// Delete a user
export const deleteUser = async (userId, token) => {

  return await API.delete(`/users/${userId}`, {
    headers: {
      // Send JWT so the backend can authenticate the request
      Authorization: `Bearer ${token}`
    }
  })

}