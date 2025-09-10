# React Authentication App

Ứng dụng React đơn giản demonstrating authentication flow với clean code và best practices.

## 📁 Cấu trúc Project

```
src/
├── components/           # Reusable UI components
│   ├── ErrorMessage.jsx  # Component hiển thị lỗi
│   ├── Loading.jsx       # Component loading spinner
│   ├── ProtectedRoute.jsx # HOC bảo vệ routes
│   └── SuccessMessage.jsx # Component hiển thị thành công
├── constants/            # Constants và config
│   └── storage.js        # Storage keys, routes, messages
├── contexts/             # React contexts
│   └── AuthContext.jsx   # Global authentication state
├── pages/                # Page components
│   ├── HomePage.jsx      # Trang chủ (protected)
│   └── LoginPage.jsx     # Trang đăng nhập
├── service/              # API services
│   ├── apiClient.js      # Axios configuration với interceptors
│   └── authService.js    # Authentication service
├── utils/                # Utility functions
│   └── localStorage.js   # LocalStorage operations
├── App.jsx               # Root component
└── main.jsx              # Entry point
```

## 🔑 Tính năng chính

### 1. Authentication Flow
- ✅ Đăng nhập với email/password
- ✅ Lưu JWT token trong localStorage
- ✅ Auto-redirect khi đã đăng nhập
- ✅ Protected routes chỉ cho user đã đăng nhập
- ✅ Đăng xuất và clear data

### 2. Global State Management
- ✅ AuthContext quản lý authentication state
- ✅ useAuth hook để sử dụng dễ dàng
- ✅ Loading state khi khởi tạo app

### 3. API Integration
- ✅ Axios client với interceptors
- ✅ Auto-add Bearer token vào headers
- ✅ Handle 401 errors và redirect
- ✅ Error handling toàn cục

## 🛠️ Cách hoạt động

### 1. App Initialization
1. `App.jsx` bọc toàn bộ app với `AuthProvider`
2. `AuthContext` check token trong localStorage
3. Validate token với server (nếu có)
4. Set authentication state

### 2. Login Flow
1. User nhập email/password trong `LoginPage`
2. `authService.login()` gửi request đến API
3. Lưu token và user data vào localStorage
4. Update global auth state
5. Redirect về trang chủ

### 3. Protected Routes
1. `ProtectedRoute` check authentication state
2. Hiển thị loading nếu đang verify
3. Redirect về login nếu chưa đăng nhập
4. Render component nếu đã đăng nhập

### 4. Logout Flow
1. User click nút đăng xuất
2. Clear token và user data khỏi localStorage
3. Reset global auth state
4. Redirect về trang login

## 📝 Code Conventions

### 1. File Naming
- Components: PascalCase (e.g., `LoginPage.jsx`)
- Utils/Services: camelCase (e.g., `authService.js`)
- Constants: camelCase (e.g., `storage.js`)

### 2. Code Style
- ✅ Extensive comments cho newbie
- ✅ JSDoc comments cho functions
- ✅ Descriptive variable names
- ✅ Single responsibility principle
- ✅ Reusable components

### 3. Error Handling
- ✅ Try-catch blocks
- ✅ User-friendly error messages
- ✅ Console logging cho debugging
- ✅ Graceful fallbacks

## 🔧 Development

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build production
```bash
npm run build
```

## 📚 Học hỏi từ code này

### For Beginners:
1. **React Basics**: Components, hooks, state management
2. **Routing**: React Router v6 usage
3. **Context API**: Global state management
4. **API Integration**: Axios, interceptors
5. **Authentication**: JWT tokens, protected routes

### Best Practices:
1. **Separation of Concerns**: Services, utils, components
2. **Reusability**: Generic components, utility functions  
3. **Error Handling**: Proper error boundaries and messages
4. **Code Documentation**: Comments và JSDoc
5. **Constants Management**: Centralized configuration

## 🔗 API Endpoints

Sử dụng reqres.in để demo:
- `POST /api/login` - Đăng nhập
- `GET /api/users/1` - Validate token (mock)
