const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const bikeRoutes = require("./routes/bikeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const sellerRequestRoutes = require("./routes/sellerRequestRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

connectDB();

const uploadRouts = require("./routes/uploadRoutes.js");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// temp debugging 
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload", uploadRouts);
app.use("/api/seller-requests", sellerRequestRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders",orderRoutes)

//test route

app.get("/", (req, res) => {
  res.send("Bike Selling & Renting API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
