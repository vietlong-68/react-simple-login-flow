/**
 * Constants cho localStorage keys
 * Tập trung quản lý các key để tránh typo và dễ thay đổi
 */

export const STORAGE_KEYS = {
    USER_TOKEN: 'userToken',
    USER_DATA: 'user'
}

/**
 * Constants cho routes/paths
 */
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login'
}

/**
 * Constants cho error messages
 */
export const ERROR_MESSAGES = {
    LOGIN_FAILED: 'Email hoặc mật khẩu không đúng.',
    NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại.',
    TOKEN_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    GENERIC_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại.'
}

/**
 * Constants cho success messages
 */
export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Đăng nhập thành công!',
    LOGOUT_SUCCESS: 'Đăng xuất thành công!'
}
