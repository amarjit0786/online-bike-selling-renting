const express = require("express");

const {
  createBooking,
  getUserBookings,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE BOOKING
router.post("/", protect, createBooking);


// USER BOOKINGS
router.get("/my-bookings", protect, getUserBookings);

module.exports = router;