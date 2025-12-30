# ShopNest - E-Commerce Frontend

A modern, responsive e-commerce frontend built with React.js, Redux Toolkit, and Tailwind CSS.

## Features

### User Features
- **Authentication**: Login, Register, Logout with JWT
- **Products**: Browse, Search, Filter by category and price
- **Shopping Cart**: Add, Remove, Update quantities
- **Checkout**: Complete order with shipping details
- **Order History**: View past orders and download invoices
- **Profile**: View account information

### Admin Dashboard
- **Dashboard**: Stats overview with revenue, products, orders
- **Products Management**: Add, Edit, Delete products
- **Orders Management**: View all orders, Update order status

## Tech Stack
- **React.js** with Hooks
- **Redux Toolkit** for state management
- **React Router DOM** for routing
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Icons** for icons
- **React Toastify** for notifications

## Setup Instructions

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   ```

## Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, Loader
│   │   ├── auth/          # ProtectedRoute
│   │   ├── products/      # ProductCard
│   │   ├── cart/
│   │   ├── orders/
│   │   └── admin/
│   ├── pages/
│   │   ├── admin/         # Dashboard, Products, Orders
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── Orders.jsx
│   │   └── Profile.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/        # authSlice, productSlice, cartSlice, orderSlice
│   ├── services/
│   │   └── api.js         # Axios instance with interceptors
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## API Integration
The frontend connects to the backend API at `http://localhost:5000/api/v1`. The Vite proxy is configured to forward `/api` requests to the backend.

## Notes
- Make sure the backend server is running on port 5000
- Register an admin user by setting `role: 'admin'` in the registration API
- Dark mode is enabled by default with a modern glassmorphism design
