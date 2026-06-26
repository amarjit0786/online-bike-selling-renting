const express = require("express");

const protect = require("../middleware/authMiddleware");

const { buyBike, getMyOrders } = require("../controllers/orderController");

const router = express.Router();

router.get("/my-orders",protect,getMyOrders);
router.post("/:bikeId", protect, buyBike);
module.exports = router;
