import { createContext, useState } from 'react'

// Global authentication context
export const AuthContext = createContext()

function AuthProvider({ children }) {
  // Load saved auth values when app starts
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [role, setRole] = useState(localStorage.getItem('role') || '')

  // Save login data after successful authentication
  const login = (loginResponse) => {
    localStorage.setItem('token', loginResponse.token)
    localStorage.setItem('email', loginResponse.email)
    localStorage.setItem('role', loginResponse.role)

    setToken(loginResponse.token)
    setEmail(loginResponse.email)
    setRole(loginResponse.role)
  }

  // Clear authentication data during logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')

    setToken('')
    setEmail('')
    setRole('')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider