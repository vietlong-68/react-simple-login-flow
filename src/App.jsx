/**
 * App Component - Root component của ứng dụng
 * Cấu hình routing và AuthProvider cho toàn bộ app
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import { ROUTES } from './constants/storage'

/**
 * Root App Component
 * Bọc toàn bộ app với AuthProvider và BrowserRouter
 * Định nghĩa các routes cho ứng dụng
 */
function App() {
  return (
    /* 
      AuthProvider cung cấp authentication context cho toàn bộ app
      Phải bọc BrowserRouter để các component con có thể sử dụng useAuth hook
    */
    <AuthProvider>
      {/* 
        BrowserRouter cung cấp routing capability cho app
        Sử dụng HTML5 history API để navigate
      */}
      <BrowserRouter>
        <Routes>
          {/* 
            Route cho trang đăng nhập
            Public route - không cần authentication
          */}
          <Route
            path={ROUTES.LOGIN}
            element={<LoginPage />}
          />

          {/* 
            Route cho trang chủ
            Protected route - cần authentication
            Bọc trong ProtectedRoute component
          */}
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* 
            Catch-all route
            Redirect tất cả routes không tồn tại về trang chủ
            ProtectedRoute sẽ handle việc redirect về login nếu chưa đăng nhập
          */}
          <Route
            path="*"
            element={<Navigate to={ROUTES.HOME} replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
