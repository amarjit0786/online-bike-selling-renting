const express = require("express");

const {
     addBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
} = require("../controllers/bikeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",protect,addBike);

router.get("/",getAllBikes);

router.get("/:id",getSingleBike);

router.put("/:id",protect, updateBike);

router.delete("/:id",protect,deleteBike);


module.exports = router;