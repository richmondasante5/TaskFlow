import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import TasksPage from '../pages/TasksPage'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ============================
            Default Route
        ============================ */}

        {/* Send visitors to the Login page */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* ============================
            Public Routes
        ============================ */}

        {/* Login does not require authentication */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* ============================
            Protected Routes
        ============================ */}

        {/* Dashboard requires authentication */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Tasks requires authentication */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* ============================
            Unknown Routes
        ============================ */}

        {/* Any URL that does not match above */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes