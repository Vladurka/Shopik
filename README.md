# 🛍️ Full-Featured Online Clothing Store

A modern, full-stack eCommerce web application for selling clothing online. Built with the **MERN stack**, this project includes real-time cart management, secure payments, and an advanced admin dashboard with analytics and Excel-based product imports.

![Demo App](/frontend/public/screenshot-for-readme.png)

---

## 🚀 Features

### 🛒 Storefront
- 🔎 **Filters & Search** — filter by size, price, brand, rating, etc.
- ❤️ **Reviews & Ratings** — leave feedback on products
- 📱 **Fully Responsive** — optimized for mobile, tablet, and desktop

### 🧾 Shopping & Payments
- 🛍️ **Shopping Cart** — real-time cart synced via Redis
- 💳 **Secure Checkout** — payments handled via **Stripe**
- 📦 **Order History** — users can view their past purchases

### 👤 Authentication
- 🔐 **Clerk Integration** — modern, secure user login and signup

### 🛠️ Admin Dashboard
- 📊 **Sales Analytics** — visual charts of sales, revenue, and product performance  
- 📦 **Order Management** — view, update, and track customer orders  
- 👥 **User Analytics** — track signups, active users, and lifetime value  
- 🧾 **Excel Import** — bulk upload new products via `.xlsx` or `.csv` files  
- 🛒 **Product Management** — create, edit, and delete products directly from the dashboard  
- 🗂️ **Inventory Control** — manage stock levels and availability  
- 🧑‍💻 **Role-Based Access** — admin-only access to sensitive operations

---

## 🧱 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Clerk.dev
- **Payments:** Stripe API
- **Caching:** Redis (for cart sessions and fast lookups)
- **File Uploads:** Multer / XLSX parser for Excel import
