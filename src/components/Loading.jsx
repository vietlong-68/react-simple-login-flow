/**
 * Loading Component
 * Component hiển thị loading state, có thể tái sử dụng
 */

/**
 * Hiển thị loading spinner với message
 * @param {object} props - Component props
 * @param {string} props.message - Message hiển thị (optional)
 * @param {boolean} props.fullScreen - Hiển thị full screen hay không (optional)
 */
const Loading = ({
    message = 'Đang tải...',
    fullScreen = false
}) => {
    // Style cho full screen loading
    const fullScreenStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
    }

    // Style cho loading container
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '100vh' : '200px',
        gap: '16px'
    }

    // Style cho spinner
    const spinnerStyle = {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    }

    return (
        <div style={fullScreen ? fullScreenStyle : {}}>
            <div style={containerStyle}>
                {/* CSS Spinner */}
                <div style={spinnerStyle}></div>

                {/* Loading message */}
                <div style={{ fontSize: '16px', color: '#666' }}>
                    {message}
                </div>
            </div>

            {/* CSS cho animation */}
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}

export default Loading
