import API from '../config/axios.js'

// Sends login data to the backend (email and password) and returns the response from the backend)
export const loginUser = async (loginData) => {
  return await API.post('/users/login', loginData)
}

// Sends registration data to the backend ()
export const registerUser = async (registerData) => {
  return await API.post('/users', registerData)
}