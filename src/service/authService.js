/**
 * Authentication Service
 * Tập trung tất cả logic liên quan đến authentication
 * Bao gồm: login, logout, validation token, quản lý user data
 */

import apiClient from './apiClient'
import {
    saveToken,
    getToken,
    saveUserData,
    getUserData,
    clearAuthData,
    hasToken
} from '../utils/localStorage'
import { ERROR_MESSAGES } from '../constants/storage'

/**
 * Service xử lý tất cả logic authentication
 */
const authService = {
    /**
     * Đăng nhập user
     * @param {string} email - Email của user
     * @param {string} password - Password của user
     * @returns {Promise<object>} Response data từ server
     * @throws {Error} Throw error nếu login thất bại
     */
    login: async (email, password) => {
        try {
            // Gửi request đăng nhập đến server
            const response = await apiClient.post('/login', {
                email,
                password
            })

            // Kiểm tra response có token không
            if (response.data.token) {
                // Lưu token vào localStorage
                saveToken(response.data.token)

                // Lưu thông tin user (nếu có) hoặc tạo user object với email
                const userData = response.data.user || { email }
                saveUserData(userData)
            }

            return response.data
        } catch (error) {
            // Log error để debug
            console.error('Login error:', error.response || error)

            // Throw error với message rõ ràng
            const errorMessage = error.response?.data?.error || ERROR_MESSAGES.LOGIN_FAILED
            throw new Error(errorMessage)
        }
    },

    /**
     * Đăng xuất user
     * Xóa tất cả dữ liệu authentication khỏi localStorage
     */
    logout: () => {
        clearAuthData()
    },

    /**
     * Lấy thông tin user hiện tại từ localStorage
     * @returns {object|null} User data hoặc null nếu không có
     */
    getCurrentUser: () => {
        return getUserData()
    },

    /**
     * Lấy token hiện tại từ localStorage
     * @returns {string|null} Token hoặc null nếu không có
     */
    getToken: () => {
        return getToken()
    },

    /**
     * Kiểm tra user có đăng nhập hay không (có token)
     * @returns {boolean} true nếu có token, false nếu không có
     */
    isAuthenticated: () => {
        return hasToken()
    },

    /**
     * Validate token với server
     * Kiểm tra token có còn hợp lệ không
     * @returns {Promise<boolean>} true nếu token hợp lệ, false nếu không hợp lệ
     */
    validateToken: async () => {
        const token = getToken()

        // Nếu không có token, trả về false
        if (!token) {
            return false
        }

        try {
            // Gửi request để validate token
            // Sử dụng endpoint bất kỳ để test token (ví dụ: get user profile)
            const response = await apiClient.get('/users/1') // Mock endpoint

            // Nếu response thành công, token hợp lệ
            return response.status === 200
        } catch (error) {
            // Nếu có lỗi (thường là 401 Unauthorized), token không hợp lệ
            // Xóa dữ liệu auth khỏi localStorage
            authService.logout()
            return false
        }
    }
}

export default authService