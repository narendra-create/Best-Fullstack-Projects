# 🍽️ Local-Bite

> A full-stack food delivery platform specifically designed for small businesses, local vendors, and street food stalls. Think Zomato/Swiggy, but tailored for local street food vendors and small-scale restaurants.

![Local-Bite](https://img.shields.io/badge/Local--Bite-Food%20Delivery-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![React](https://img.shields.io/badge/React-19.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

Local-Bite is a comprehensive food delivery platform that bridges the gap between customers and local food vendors, including street food stalls and small-scale restaurants. The platform enables vendors to manage their products, track orders, and monitor sales analytics, while customers can browse vendors, add items to cart, and place orders with secure payment processing.

### Why Local-Bite?

- **Local Focus**: Built specifically for small businesses and street food vendors
- **Dual Roles**: Separate dashboards for customers and vendors
- **Real-time Tracking**: Live order status updates
- **Secure Payments**: Integrated Razorpay payment gateway
- **Analytics Dashboard**: Vendors can track sales and revenue
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Features

### For Customers 🛒

- **User Authentication**: Secure registration and login with JWT tokens
- **Vendor Discovery**: Browse all available vendors with their menus
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: 
  - Place orders with custom instructions
  - Track order status in real-time (Pending → Accepted → Preparing → Out for Delivery → Completed)
  - View order history
- **Payment Integration**: Secure payment processing via Razorpay
- **Responsive UI**: Modern, intuitive interface built with Tailwind CSS

### For Vendors 🏪

- **Vendor Dashboard**: Comprehensive analytics and statistics
  - Total revenue tracking
  - Sales analytics with charts
  - Active orders count
  - Recent sales history
- **Shop Management**: 
  - Open/Close shop toggle
  - Product management (Add, Edit, Delete, Stock management)
  - Category and type management (Veg/Non-Veg)
- **Order Management**: 
  - View new orders
  - Update order status
  - Track ongoing orders
- **Product Catalog**: Manage menu items with images, prices, and descriptions

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (React 19.1.0)
- **Styling**: Tailwind CSS 4.1.14
- **State Management**: React Query (@tanstack/react-query)
- **UI Components**: Radix UI, Lucide React Icons
- **Charts**: Recharts
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.19.0
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Security**: Bcrypt for password hashing, Cookie-based auth

### Development Tools
- **Code Quality**: ESLint
- **Package Manager**: npm
- **Environment Management**: dotenv

## Architecture

```
Local-Bite/
├── client/                 # Next.js Frontend Application
│   ├── app/               # App Router (Next.js 15)
│   │   ├── components/    # Reusable UI components
│   │   ├── Cards/         # Card components (Product, Vendor, Cart, etc.)
│   │   ├── contexts/      # React Context (AuthContext)
│   │   ├── VendorTools/   # Vendor dashboard pages
│   │   └── CustomerTools/ # Customer pages
│   ├── public/            # Static assets
│   └── lib/               # Utility functions
│
└── server/                # Express.js Backend API
    ├── config/            # Database & external service configs
    ├── controllers/       # Business logic
    ├── models/            # MongoDB schemas
    ├── routes/            # API routes
    ├── middlewares/       # JWT authentication middleware
    └── server.js          # Entry point
```

### Database Schema

- **User**: Authentication and user profiles (customer/vendor roles)
- **Vendor**: Vendor profiles (name, category, image, open/close status)
- **Product**: Menu items (name, price, description, stock status, type)
- **Order**: Order details (items, status, payment, timestamps)
- **Cart**: Shopping cart management (items, totals, vendor)

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Razorpay account (for payment gateway)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Local-Bite.git
cd Local-Bite
```

### Step 2: Install Dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd server
npm install
```

### Step 3: Environment Variables

Create `.env.local` files in both `client` and `server` directories. See [Environment Variables](#environment-variables) section below.

### Step 4: Start the Development Servers

#### Terminal 1 - Backend Server
```bash
cd server
npm start
```
Backend runs on `http://localhost:5000`

#### Terminal 2 - Frontend Server
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:3000`

## Environment Variables

### Server (.env.local)

```env
# Database
MONGO_URI=mongodb://localhost:27017/local-bite
# or
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/local-bite

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Razorpay
RAZORPAY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
```

### Client (.env.local)

```env
NEXT_PUBLIC_BACKENDURL=http://localhost:5000
```

## API Documentation

### Authentication
- `POST /api/auth/` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/verify` - Verify JWT token

### Vendors
- `GET /api/vendor/all` - Get all vendors
- `GET /api/vendor/:id` - Get vendor by ID
- `GET /api/vendor/sales-data` - Get sales analytics (vendor only)
- `GET /api/vendor/number-data` - Get dashboard statistics (vendor only)
- `GET /api/vendor/shopstatus` - Get shop open/close status
- `POST /api/vendor/setshop` - Update shop status

### Products
- `GET /api/product/:vendorId` - Get products by vendor
- `POST /api/product/:vendorId` - Add product (vendor only)
- `GET /api/product/MyProducts` - Get vendor's products
- `DELETE /api/product/delete/:id` - Delete product
- `PUT /api/product/stock` - Update product stock status

### Cart
- `GET /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/updateqty` - Update item quantity
- `DELETE /api/cart/delete/:productid` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/order/place` - Place new order
- `GET /api/order/current` - Get current/active orders
- `GET /api/order/currentsingle/:order_id` - Get single order details
- `PUT /api/order/updatestatus/:OrderId` - Update order status (vendor only)
- `GET /api/order/history` - Get order history

### Payments
- `POST /api/payment/verify-payment` - Verify Razorpay payment

## Project Structure

### Frontend (client/)
```
client/
├── app/
│   ├── Cards/              # Card components
│   │   ├── CartProduct/    # Cart item card
│   │   ├── ProductCard/    # Product display card
│   │   ├── VendorCard/     # Vendor card
│   │   └── ...
│   ├── components/         # Main components
│   │   ├── HomePage/       # Homepage
│   │   ├── Cart/           # Shopping cart
│   │   ├── Login/          # Login page
│   │   ├── Register/       # Registration page
│   │   └── Navbar/         # Navigation bar
│   ├── VendorTools/        # Vendor dashboard
│   │   ├── Dashboard/      # Analytics dashboard
│   │   ├── Addproducts/    # Add products page
│   │   ├── ManageProducts/ # Manage products page
│   │   └── CurrentOrders/  # Vendor orders page
│   ├── CustomerTools/      # Customer pages
│   │   ├── OrderStatus/    # Track orders
│   │   └── History/        # Order history
│   └── contexts/           # React contexts
│       └── AuthContext.js  # Authentication context
└── public/                 # Static assets
```

### Backend (server/)
```
server/
├── config/
│   ├── db.js              # MongoDB connection
│   └── razorpay.js        # Razorpay configuration
├── controllers/
│   ├── UserController.js  # User authentication logic
│   ├── VendorController.js # Vendor operations
│   ├── ProductController.js # Product management
│   ├── CartController.js   # Cart operations
│   ├── OrderController.js  # Order management
│   └── PaymentController.js # Payment verification
├── models/
│   ├── UserSchema.js      # User model
│   ├── VendorSchema.js    # Vendor model
│   ├── ProductSchema.js   # Product model
│   ├── OrderSchema.js     # Order model
│   └── CartSchema.js      # Cart model
├── routes/
│   └── ...                # API route definitions
└── middlewares/
    └── jwtcheck.js        # JWT authentication middleware
```

## Key Features Breakdown

### 1. Dual Authentication System
- Role-based access control (Customer/Vendor)
- JWT token-based authentication
- HTTP-only cookies for secure token storage
- Protected routes with middleware

### 2. Shopping Cart System
- Persistent cart (database-backed for logged-in users)
- Real-time price calculation
- Automatic tax/delivery charge calculation
- Vendor-specific cart (items from one vendor at a time)

### 3. Order Management
- Order status workflow: PENDING → ACCEPTED → PREPARING → OUT FOR DELIVERY → COMPLETED
- Separate views for customers and vendors
- Order history tracking
- Order grouping by vendor

### 4. Payment Integration
- Razorpay payment gateway integration
- Secure payment verification
- Order ID generation with unique references
- Payment status tracking

### 5. Vendor Dashboard
- Sales analytics with charts (Recharts)
- Revenue tracking
- Active orders count
- Recent sales history
- Shop open/close toggle

### 6. Product Management
- CRUD operations for products
- Stock management (in-stock/out-of-stock)
- Category and type filtering (Veg/Non-Veg)
- Image upload support

## Screenshots


- Homepage with vendor listings
  ![home page](image.png)

- Product catalog page
- ![vendor products](image-1.png)
  
- Shopping cart
  ![cart](image-2.png)

- Order tracking page
  ![current orders](image-3.png)

- Vendor dashboard
  ![Dashboard](image-4.png)

- Product management interface
  ![Manage products](image-5.png)

## Future Enhancements

- [ ] Real-time notifications (WebSockets)
- [ ] Advanced search and filtering
- [ ] Rating and review system
- [ ] Delivery tracking with maps integration
- [ ] Multiple payment methods
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Image upload to cloud storage (AWS S3/Cloudinary)
- [ ] Push notifications
- [ ] Wishlist functionality
- [ ] Loyalty program
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Narendra Dubey**
- GitHub: [@narendra-create](https://github.com/narendra-create)
- LinkedIn: [Narendra Dubey](https://www.linkedin.com/in/narendra-dubey-7147042b8)
- Email: namanworkplace@gmail.com

## Acknowledgments

- Next.js team for the amazing framework
- Razorpay for payment gateway services
- All open-source contributors whose libraries made this project possible

---

⭐ If you found this project helpful, please give it a star!