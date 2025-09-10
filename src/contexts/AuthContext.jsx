/**
 * Authentication Context
 * Quản lý global state cho authentication trong toàn bộ app
 * Bao gồm: user data, authentication status, loading state
 */

import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../service/authService'

/**
 * Tạo React Context cho authentication
 */
const AuthContext = createContext()

/**
 * Custom hook để sử dụng AuthContext
 * Sử dụng hook này thay vì useContext(AuthContext) trực tiếp
 * @returns {object} Auth context value
 * @throws {Error} Nếu được sử dụng ngoài AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext)

    // Kiểm tra hook có được sử dụng trong AuthProvider không
    if (!context) {
        throw new Error('useAuth phải được sử dụng trong AuthProvider')
    }

    return context
}

/**
 * AuthProvider Component
 * Bọc toàn bộ app để cung cấp authentication state
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
    // State để quản lý thông tin user hiện tại
    const [user, setUser] = useState(null)

    // State để quản lý trạng thái loading
    const [loading, setLoading] = useState(true)

    // State để quản lý trạng thái authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    /**
     * Effect chạy khi component mount
     * Kiểm tra user đã đăng nhập hay chưa
     */
    useEffect(() => {
        initializeAuth()
    }, [])

    /**
     * Khởi tạo authentication khi app start
     * Kiểm tra token trong localStorage và validate với server
     */
    const initializeAuth = async () => {
        try {
            setLoading(true)

            // Lấy token từ localStorage
            const token = authService.getToken()

            if (token) {
                // Nếu có token, validate với server
                const isValidToken = await authService.validateToken()

                if (isValidToken) {
                    // Token hợp lệ, lấy thông tin user và set authenticated
                    const currentUser = authService.getCurrentUser()
                    setUser(currentUser)
                    setIsAuthenticated(true)
                } else {
                    // Token không hợp lệ, logout user
                    authService.logout()
                    resetAuthState()
                }
            } else {
                // Không có token, user chưa đăng nhập
                resetAuthState()
            }
        } catch (error) {
            // Có lỗi xảy ra, logout user để đảm bảo an toàn
            console.error('Error initializing auth:', error)
            authService.logout()
            resetAuthState()
        } finally {
            setLoading(false)
        }
    }

    /**
     * Reset authentication state về trạng thái chưa đăng nhập
     */
    const resetAuthState = () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    /**
     * Đăng nhập user
     * @param {string} email - Email của user
     * @param {string} password - Password của user
     * @returns {Promise<object>} Login response data
     * @throws {Error} Nếu login thất bại
     */
    const login = async (email, password) => {
        try {
            setLoading(true)

            // Gọi authService để đăng nhập
            const loginData = await authService.login(email, password)

            // Lấy thông tin user sau khi đăng nhập thành công
            const currentUser = authService.getCurrentUser()

            // Cập nhật state
            setUser(currentUser)
            setIsAuthenticated(true)

            return loginData
        } catch (error) {
            // Re-throw error để component có thể handle
            throw error
        } finally {
            setLoading(false)
        }
    }

    /**
     * Đăng xuất user
     * Xóa tất cả authentication data và reset state
     */
    const logout = () => {
        // Gọi authService để xóa data khỏi localStorage
        authService.logout()

        // Reset authentication state
        resetAuthState()
    }

    /**
     * Value được cung cấp cho tất cả child components
     */
    const authContextValue = {
        // State
        user,                    // Thông tin user hiện tại
        isAuthenticated,         // Trạng thái đăng nhập
        loading,                 // Trạng thái loading

        // Actions
        login,                   // Function để đăng nhập
        logout                   // Function để đăng xuất
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}
