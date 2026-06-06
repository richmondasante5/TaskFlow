import axios from 'axios'

// Base URL for user authentication endpoints in the Spring Boot backend
const API_URL = 'http://localhost:8080/users'

// Sends login data to the backend
// Expected data format:
// {
//   email: "user@email.com",
//   password: "password"
// }
export const loginUser = async (loginData) => {
  return await axios.post(`${API_URL}/login`, loginData)
}

// Sends registration data to the backend
// backend creates users using POST /users
export const registerUser = async (registerData) => {
  return await axios.post(API_URL, registerData)
}