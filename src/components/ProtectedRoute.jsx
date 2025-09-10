/**
 * Protected Route Component
 * Bảo vệ các route cần authentication
 * Chỉ cho phép user đã đăng nhập truy cập
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'
import { ROUTES } from '../constants/storage'

/**
 * Component bảo vệ route, chỉ cho phép user đã đăng nhập truy cập
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Component con cần được bảo vệ
 */
const ProtectedRoute = ({ children }) => {
    // Lấy authentication state từ AuthContext
    const { isAuthenticated, loading } = useAuth()

    // Hiển thị loading trong khi kiểm tra authentication
    if (loading) {
        return <Loading message="Đang kiểm tra quyền truy cập..." fullScreen />
    }

    // Nếu user chưa đăng nhập, redirect về trang login
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    // Nếu user đã đăng nhập, hiển thị component con
    return children
}

export default ProtectedRoute