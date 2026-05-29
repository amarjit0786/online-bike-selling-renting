const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser =require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const bikeRoutes = require("./routes/bikeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const uploadRouts = require("./routes/uploadRoutes.js");

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
     origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/upload",uploadRouts)

//test route


app.get("/",(req,res)=>{
    res.send("Bike Selling & Renting API Running...");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
