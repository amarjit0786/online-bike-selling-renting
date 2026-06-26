const Order = require("../models/Order");
const Bike = require("../models/Bike");

const buyBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.bikeId);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not Found",
      });
    }

    if (bike.isSold) {
      return res.status(400).json({
        message: "Bike already sold",
      });
    }

    if (bike.seller.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot purchase your own bike",
      });
    }

    const order = await Order.create({
      buyer: req.user.id,
      bike: bike._id,
      seller: bike.seller,
      price: bike.price,
    });
    bike.isSold = true;
    bike.available = false;

    await bike.save();

    res.status(201).json({
      success: true,
      message: "Bike purchased successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user.id,
    })
      .populate("bike")
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { buyBike,getMyOrders };
