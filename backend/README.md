# E-Commerce Backend (MERN Stack)

A production-ready e-commerce backend built with Node.js, Express.js, and MongoDB.

## Features
- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Authorization**: Role-based access control (Admin & User).
- **Product Management**: Complete CRUD for products (Admin only for Create/Update/Delete).
- **Cart System**: Persistent cart management in database.
- **Order Management**: Checkout and order tracking.
- **Invoice System**: Automatic PDF invoice generation upon order placement using `pdfkit`.
- **Image Uploads**: Local storage support via `multer`.
- **Security**: Secure JWT storage in HTTP-only cookies, password hashing, and input validation.

## Prerequisites
- Node.js installed
- MongoDB installed and running (default: `mongodb://localhost:27017/ecommerce`)

## Setup Instructions

1. **Clone the repository** (or just navigate to the folder)
2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Configure Environment Variables**:
   Edit `backend/.env` with your specific configurations.
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   COOKIE_EXPIRE=30
   ```
4. **Start the server**:
   ```bash
   npm start (or use nodemon for dev)
   ```

## Folder Structure
```
backend/
├── config/         # DB connection
├── controllers/    # Route logic
├── models/         # Mongoose schemas
├── routes/         # API endpoints
├── middleware/     # Auth, error handling
├── utils/          # Helpers (PDF, Multer)
├── uploads/        # Static assets (images, invoices)
├── server.js       # Entry point
└── .env            # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register user
- `POST /api/v1/login` - Login user
- `GET /api/v1/logout` - Logout user
- `GET /api/v1/me` - Get current user profile

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/product/:id` - Get single product
- `POST /api/v1/admin/product/new` - Create product (Admin)
- `PUT /api/v1/admin/product/:id` - Update product (Admin)
- `DELETE /api/v1/admin/product/:id` - Delete product (Admin)

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/add` - Add item to cart
- `DELETE /api/v1/cart/remove/:productId` - Remove item from cart

### Orders & Invoices
- `POST /api/v1/order/new` - Create new order (Generates Invoice)
- `GET /api/v1/order/:id` - Get order details
- `GET /api/v1/orders/me` - Get logged-in user's orders
- `GET /api/v1/order/invoice/:id` - Download PDF Invoice
- `GET /api/v1/admin/orders` - Get all orders (Admin)
- `PUT /api/v1/admin/order/:id` - Process order (Admin)

## Postman Collection
A JSON file for Postman import is provided in the project root as `Ecommerce_API_Collection.json`.
