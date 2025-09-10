/**
 * Error Message Component
 * Component hiển thị thông báo lỗi, có thể tái sử dụng
 */

/**
 * Hiển thị error message với style phù hợp
 * @param {object} props - Component props
 * @param {string} props.message - Nội dung thông báo lỗi
 * @param {function} props.onClose - Callback khi đóng thông báo (optional)
 */
const ErrorMessage = ({ message, onClose }) => {
    // Style cho error container
    const errorStyle = {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        padding: '12px 16px',
        margin: '8px 0',
        color: '#c33',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    // Style cho close button
    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        color: '#c33',
        cursor: 'pointer',
        fontSize: '18px',
        marginLeft: '12px'
    }

    // Không hiển thị gì nếu không có message
    if (!message) return null

    return (
        <div style={errorStyle}>
            <span>{message}</span>

            {/* Hiển thị nút đóng nếu có onClose callback */}
            {onClose && (
                <button
                    style={closeButtonStyle}
                    onClick={onClose}
                    title="Đóng thông báo"
                >
                    ×
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
