/**
 * Login Page Component
 * Trang đăng nhập cho user
 * Bao gồm: form đăng nhập, validation, error handling
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ErrorMessage from '../components/ErrorMessage'
import SuccessMessage from '../components/SuccessMessage'
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/storage'

/**
 * Trang đăng nhập
 */
const LoginPage = () => {
    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // UI state
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    // Auth context và navigation
    const { login, loading, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    /**
     * Effect: Redirect nếu user đã đăng nhập
     */
    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTES.HOME, { replace: true })
        }
    }, [isAuthenticated, navigate])

    /**
     * Xử lý thay đổi input
     * @param {Event} event - Input change event
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))

        // Clear message khi user nhập liệu
        if (message) {
            setMessage('')
        }
    }

    /**
     * Xử lý submit form đăng nhập
     * @param {Event} event - Form submit event
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // Gọi login function từ AuthContext
            await login(formData.email, formData.password)

            // Hiển thị thông báo thành công
            setIsError(false)
            setMessage(SUCCESS_MESSAGES.LOGIN_SUCCESS)

            // Redirect về trang chủ
            navigate(ROUTES.HOME, { replace: true })
        } catch (error) {
            // Hiển thị thông báo lỗi
            const errorMessage = error.message || ERROR_MESSAGES.LOGIN_FAILED
            setMessage(errorMessage)
            setIsError(true)
        }
    }

    /**
     * Xóa thông báo
     */
    const clearMessage = () => {
        setMessage('')
    }

    // Style cho form container
    const formContainerStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff'
    }

    // Style cho form group
    const formGroupStyle = {
        marginBottom: '16px'
    }

    // Style cho label
    const labelStyle = {
        display: 'block',
        marginBottom: '4px',
        fontWeight: 'bold',
        fontSize: '14px'
    }

    // Style cho input
    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box'
    }

    // Style cho button
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: loading ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: loading ? 'not-allowed' : 'pointer'
    }

    return (
        <div style={formContainerStyle}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
                    Đăng nhập
                </h2>

                {/* Email Input */}
                <div style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                        disabled={loading}
                        placeholder="Nhập email của bạn"
                    />
                </div>

                {/* Password Input */}
                <div style={formGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                        disabled={loading}
                        placeholder="Nhập mật khẩu của bạn"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
            </form>

            {/* Hiển thị thông báo */}
            {message && (
                isError ? (
                    <ErrorMessage message={message} onClose={clearMessage} />
                ) : (
                    <SuccessMessage message={message} onClose={clearMessage} />
                )
            )}
        </div>
    )
}

export default LoginPage
