const express = require("express");

const {
  addBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
  getSellerBikes,
} = require("../controllers/bikeController");

const sellerOnly = require("../middleware/sellerMiddleware");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, sellerOnly, addBike);
router.get("/seller/my-bikes", protect, sellerOnly, getSellerBikes);

router.get("/", getAllBikes);

router.get("/:id", getSingleBike);

router.put("/:id", protect, updateBike);

router.delete("/:id", protect, deleteBike);

module.exports = router;
