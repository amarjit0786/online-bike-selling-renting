const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
  getAllBikes,
  deleteBike,
  getAllBookings,
} = require("../controllers/adminController");

router.get("/users", protect, adminOnly, getAllUsers);

router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/bikes", protect, adminOnly, getAllBikes);
router.delete("/bikes/:id", protect, adminOnly, deleteBike);
router.get("/bookings", protect,adminOnly,getAllBookings);

module.exports = router;
