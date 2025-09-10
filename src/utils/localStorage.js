/**
 * Utility functions để thao tác với localStorage
 * Tập trung tất cả logic liên quan đến localStorage ở đây
 */

import { STORAGE_KEYS } from '../constants/storage'

/**
 * Lưu token vào localStorage
 * @param {string} token - JWT token từ server
 */
export const saveToken = (token) => {
    if (!token) return
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token)
}

/**
 * Lấy token từ localStorage
 * @returns {string|null} token hoặc null nếu không có
 */
export const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.USER_TOKEN)
}

/**
 * Xóa token khỏi localStorage
 */
export const removeToken = () => {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN)
}

/**
 * Lưu thông tin user vào localStorage
 * @param {object} userData - Thông tin user từ server
 */
export const saveUserData = (userData) => {
    if (!userData) return
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
}

/**
 * Lấy thông tin user từ localStorage
 * @returns {object|null} user data hoặc null nếu không có
 */
export const getUserData = () => {
    try {
        const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
        return userData ? JSON.parse(userData) : null
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error)
        return null
    }
}

/**
 * Xóa thông tin user khỏi localStorage
 */
export const removeUserData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
}

/**
 * Xóa tất cả dữ liệu auth khỏi localStorage
 */
export const clearAuthData = () => {
    removeToken()
    removeUserData()
}

/**
 * Kiểm tra xem user có token hay không
 * @returns {boolean} true nếu có token, false nếu không có
 */
export const hasToken = () => {
    return !!getToken()
}
