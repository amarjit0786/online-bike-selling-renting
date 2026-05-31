const User = require("../models/User");
const Bike = require("../models/Bike");
const Booking = require("../models/Booking");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all bikes

const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate("seller", "name email");

    res.status(200).json({
      success: true,
      bikes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ANY BIKE
const deleteBike = async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bike deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("bike", "title image");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DASHBOARD STATS

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalSellers = await User.countDocuments({
      role: "seller",
    });

    const totalBikes = await Bike.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find();

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (booking.totalPrice || 0),
      0,
    );

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalSellers,
        totalBikes,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllBikes,
  deleteBike,
  getAllBookings,
  getDashboardStats,
};
