# Gadgetize Store — E-Commerce Platform (v1.0)

Gadgetize Store is a full-stack e-commerce web application for selling tech products, laptops, accessories, and digital devices. It includes a user-friendly store for customers and a secure admin dashboard for store owners.

---

## Features

### Customer Storefront
* **Dynamic Home Page:** Hero banners, category sliders, Best Sellers grid, Flash Sale banners, and blog posts.
* **Flash Sale Countdown:** Real-time countdown timer for limited-time offers.
* **Product Search & Filter:** Live search bar, category filter, brand filter, price range slider, and color options.
* **Shopping Cart & Checkout:** Easy cart management, discount coupon verification, and order placement.
* **User Profile:** Manage personal information, view order history, and track order progress.

### Admin Dashboard
* **Separate Admin Portal:** Secure login at `/admin/login` only for users with the `admin` role.
* **Store Analytics:** View total customers, total income, total orders, top-selling products, and recent orders.
* **Product Management (CRUD):** Add, update, or delete products, upload images, manage stock, and set prices.
* **Order Management:** View all customer orders and update shipping statuses (Pending, Processing, Shipping, Delivered).
* **Admin Preview Mode:** Admins can view the store safely without accidentally buying items.

---

## Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Custom CSS |
| **Backend** | Node.js, Express.js (Pure Express & SQL queries, no ORM) |
| **Database** | PostgreSQL |
| **Auth** | JSON Web Token (JWT), Bcrypt |
| **File Upload** | Multer |

---

## Quick Start

### Prerequisites
Make sure you have installed:
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher
* **PostgreSQL**: v14.x or higher

### Installations

1. **Clone the repository**
   ```bash
   git clone https://github.com/nhnhatminh/gadgetize-ecommerce-website.git
   cd gadgetize-store
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up the Database**
   * Create a PostgreSQL database named `gadgetize_db`.
   * Run the seed script in `backend/src/scripts/seed.js` to create tables and initial data.

4. **Environment Setup**
   Create a `.env` file inside the `backend/` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=gadgetize_db
   JWT_SECRET=your_secret_key_here
   ```

5. **Run the Application**
   ```bash
   # Start backend (from /backend)
   npm run dev

   # Start frontend (from /frontend in another terminal)
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Repository Structure

```text
gadgetize-store/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and environment setup
│   │   ├── controllers/     # Logic for auth, products, orders, cart
│   │   ├── middlewares/     # JWT authentication and admin role checks
│   │   ├── routes/          # API endpoints
│   │   └── scripts/         # Database seed scripts
│   ├── uploads/             # Stored uploaded product images
│   └── package.json
├── frontend/
│   ├── public/              # Images, icons, and fonts
│   ├── src/
│   │   ├── api/             # Axios API wrappers
│   │   ├── components/      # UI components (cart, home, shared, admin)
│   │   ├── context/         # AuthContext and CartContext
│   │   ├── hooks/           # Custom hooks (useCountdown, useAuth)
│   │   ├── pages/           # Pages (Home, Shop, Admin, Profile)
│   │   └── styles/          # CSS files
│   └── package.json
└── README.md
```

## Developer Checklist

Before pushing code or deploying, check these items:
1. [x] **Database connection works**: Check if seed data loads correctly.
2. [x] **Admin portal is safe**: Normal users cannot enter `/admin`.
3. [x] **Product upload works**: Images are saved in `/uploads` correctly.
4. [x] **No hardcoded secrets**: All secret keys are inside the `.env` file.
5. [x] **Responsive design**: Test layout on desktop and mobile screens.

---

## Contributing

Contributions are welcome! Follow these simple steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feat/new-feature`).
3. Commit your changes (`git commit -m "feat: add new feature"`).
4. Push to your branch (`git push origin feat/new-feature`).
5. Open a Pull Request.

---

## License & Author

Developed by **Nguyen Huynh Nhat Minh** (nhnhatminh).  