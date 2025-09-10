/**
 * Home Page Component
 * Trang chủ hiển thị sau khi user đăng nhập thành công
 * Bao gồm: thông tin user, nút đăng xuất
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ROUTES } from '../constants/storage'

/**
 * Trang chủ của ứng dụng
 */
const HomePage = () => {
    // Auth context và navigation
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    /**
     * Xử lý đăng xuất
     * Logout user và redirect về trang login
     */
    const handleLogout = () => {
        // Gọi logout function từ AuthContext
        logout()

        // Redirect về trang login
        navigate(ROUTES.LOGIN, { replace: true })
    }

    // Style cho page container
    const pageContainerStyle = {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center'
    }

    // Style cho welcome section
    const welcomeSectionStyle = {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e9ecef'
    }

    // Style cho user info
    const userInfoStyle = {
        backgroundColor: '#e3f2fd',
        padding: '16px',
        borderRadius: '6px',
        margin: '16px 0',
        color: '#1976d2'
    }

    // Style cho logout button
    const logoutButtonStyle = {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    }

    return (
        <div style={pageContainerStyle}>
            {/* Welcome Header */}
            <div style={welcomeSectionStyle}>
                <h1 style={{ margin: '0 0 16px 0', color: '#2c3e50' }}>
                    🏠 Trang chủ
                </h1>

                <p style={{ margin: '0', color: '#6c757d', fontSize: '16px' }}>
                    Chào mừng bạn đến với ứng dụng!
                </p>
            </div>

            {/* User Information */}
            {user && (
                <div style={userInfoStyle}>
                    <h3 style={{ margin: '0 0 8px 0' }}>
                        👋 Xin chào!
                    </h3>
                    <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
                        {user.email}
                    </p>
                </div>
            )}

            {/* Action Section */}
            <div style={{ marginTop: '32px' }}>
                <p style={{ marginBottom: '16px', color: '#6c757d' }}>
                    Bạn đã đăng nhập thành công vào hệ thống
                </p>

                <button
                    onClick={handleLogout}
                    style={logoutButtonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                    🚪 Đăng xuất
                </button>
            </div>

            {/* Footer Info */}
            <div style={{ marginTop: '40px', fontSize: '14px', color: '#adb5bd' }}>
                <p>✨ Ứng dụng demo authentication với React</p>
            </div>
        </div>
    )
}

export default HomePage
