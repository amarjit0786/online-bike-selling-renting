# 🚲 CityGlide - Bike Selling & Rental Platform

CityGlide is a full-stack MERN application that enables users to buy, sell, and rent motorcycles through a modern and user-friendly platform. The application includes secure authentication, role-based access control, bike listings, booking management, seller verification, image uploads, and an admin dashboard.

## 🌐 Live Demo

**Frontend:** https://online-bike-selling-renting.vercel.app

**Backend API:** https://cityglide-api.onrender.com

---

## 📌 Features

### 👤 User Features

* User Registration and Login
* JWT Authentication
* Browse Available Bikes
* View Bike Details
* Rent Bikes
* Manage Personal Bookings

### 🏍️ Seller Features

* Request Seller Access
* Add New Bike Listings
* Update Bike Details
* Delete Bike Listings
* View Seller Dashboard

### 🛡️ Admin Features

* Manage Users
* Manage Bikes
* View Platform Statistics
* Approve or Reject Seller Requests
* Monitor Bookings

### ☁️ Media Management

* Cloudinary Image Upload Integration
* Secure Image Storage

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Cloudinary

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
CityGlide/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

## 🔐 Authentication & Authorization

The application uses JWT-based authentication and role-based access control.

### Roles

* User
* Seller
* Admin

Protected routes ensure that users can only access features relevant to their role.

---

## 📊 Key Functionalities

### Bike Management

* Create Bike Listings
* Update Bike Information
* Delete Bike Listings
* Browse Available Bikes

### Booking System

* Create Rental Bookings
* View Booking History
* Track Rental Status

### Seller Verification

* Submit Seller Requests
* Admin Approval Workflow

---

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://cityglide-api.onrender.com/api
```

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=https://online-bike-selling-renting.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/amarjit0786/online-bike-selling-renting.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

---

## 📸 Screenshots

### Home Page

<img width="1920" height="914" alt="image" src="https://github.com/user-attachments/assets/39dd94a4-465d-4548-8e17-d9e3e841aad0" />


### Seller Dashboard

<img width="1920" height="919" alt="image" src="https://github.com/user-attachments/assets/7c31a93f-cecf-4759-baec-4069ae997597" />


### Admin Panel

<img width="1920" height="921" alt="image" src="https://github.com/user-attachments/assets/6da81342-dec8-4568-a59a-0af20aa958ad" />
.

---

## 👨‍💻 Author

**Amarjit Singh**

MERN Stack Developer

GitHub: https://github.com/amarjit0786

---

## ⭐ Future Improvements

* Online Payment Gateway Integration
* Real-Time Chat Between Buyer and Seller
* Bike Recommendation System
* Advanced Search & Filters
* Wishlist Feature
* Email Notifications

---

If you found this project useful, please consider giving it a ⭐ on GitHub.
