import axios from 'axios'

// Backend user API base URL
const API_URL = 'http://localhost:8080/users'

// Get all users from backend
// Only ADMIN can access this based on your Spring Security rules
export const getAllUsers = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}