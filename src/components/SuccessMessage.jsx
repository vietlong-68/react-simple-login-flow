/**
 * Success Message Component
 * Component hiển thị thông báo thành công, có thể tái sử dụng
 */

/**
 * Hiển thị success message với style phù hợp
 * @param {object} props - Component props
 * @param {string} props.message - Nội dung thông báo thành công
 * @param {function} props.onClose - Callback khi đóng thông báo (optional)
 */
const SuccessMessage = ({ message, onClose }) => {
    // Style cho success container
    const successStyle = {
        backgroundColor: '#efe',
        border: '1px solid #cfc',
        borderRadius: '4px',
        padding: '12px 16px',
        margin: '8px 0',
        color: '#3c3',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    // Style cho close button
    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        color: '#3c3',
        cursor: 'pointer',
        fontSize: '18px',
        marginLeft: '12px'
    }

    // Không hiển thị gì nếu không có message
    if (!message) return null

    return (
        <div style={successStyle}>
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

export default SuccessMessage
