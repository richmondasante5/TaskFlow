import API from '../config/axios.js'

// Get all users from backend
// Only ADMIN can access this endpoint based on the Security rules
export const getAllUsers = async (token) => {
  return await API.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}