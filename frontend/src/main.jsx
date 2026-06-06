import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthContext'
import App from './app/App.jsx'
import './index.css'

// Entry point of the React application
createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* Provides authentication data to the entire application */}
    <AuthProvider>
      <App />
    </AuthProvider>

  </StrictMode>,
)