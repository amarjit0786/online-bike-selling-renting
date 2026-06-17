const express = require("express");

const protect = require("../middleware/authMiddleware");

const { buyBike } = require("../controllers/orderController");

const router = express.Router();

router.post("/:bikeId", protect, buyBike);
module.exports = router;
