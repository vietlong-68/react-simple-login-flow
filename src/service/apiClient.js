/**
 * API Client Configuration
 * Cấu hình axios để giao tiếp với backend API
 * Bao gồm: base URL, headers, interceptors
 */

import axios from 'axios'
import { getToken, clearAuthData } from '../utils/localStorage'
import { ROUTES } from '../constants/storage'

/**
 * Tạo axios instance với cấu hình cơ bản
 */
const apiClient = axios.create({
    // Base URL cho tất cả API calls
    baseURL: 'https://reqres.in/api',

    // Headers mặc định cho tất cả requests
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
    }
})

/**
 * Request Interceptor
 * Tự động thêm Authorization header cho mọi request
 * Chạy trước khi request được gửi đi
 */
apiClient.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = getToken()

        // Nếu có token, thêm vào Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        // Xử lý lỗi request
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
    }
)

/**
 * Response Interceptor
 * Xử lý response và error toàn cục
 * Chạy sau khi nhận được response từ server
 */
apiClient.interceptors.response.use(
    (response) => {
        // Nếu response thành công, trả về response
        return response
    },
    (error) => {
        // Xử lý các loại error khác nhau
        if (error.response?.status === 401) {
            // 401 Unauthorized: Token hết hạn hoặc không hợp lệ
            console.warn('Token expired or invalid. Redirecting to login...')

            // Xóa dữ liệu auth khỏi localStorage
            clearAuthData()

            // Redirect về trang login
            // Sử dụng window.location để force reload page
            window.location.href = ROUTES.LOGIN
        } else if (error.response?.status >= 500) {
            // 5xx: Server error
            console.error('Server error:', error.response.status, error.response.data)
        } else if (error.code === 'NETWORK_ERROR') {
            // Network error: Không kết nối được server
            console.error('Network error:', error.message)
        }

        return Promise.reject(error)
    }
)

export default apiClient