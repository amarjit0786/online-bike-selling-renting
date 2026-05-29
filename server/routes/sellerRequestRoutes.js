const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSellerRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/sellerRequestController");

const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, createSellerRequest);
router.get("/", protect, adminOnly, getAllRequests);

router.patch("/approve/:id", protect, adminOnly, approveRequest);

router.patch("/reject/:id", protect, adminOnly, rejectRequest);

module.exports = router;
