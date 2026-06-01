const Booking = require("../models/Booking");
const Bike = require("../models/Bike");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { bikeId, startDate, endDate } = req.body;

    // Validation
    if (!bikeId || !startDate || !endDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const bike = await Bike.findById(bikeId);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    const start = new Date(startDate);

    const end = new Date(endDate);

    const today = new Date();
    // Overlapping Booking Check
    const existingBooking = await Booking.findOne({
      bike: bikeId,
      status: {
        $ne: "cancelled",
      },

      $or: [
        {
          startDate: {
            $lte: end,
          },
          endDate: {
            $gte: start,
          },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Bike already booked for selected dates",
      });
    }

    today.setHours(0, 0, 0, 0);

    // Past Date Check
    if (start < today) {
      return res.status(400).json({
        message: "Start date cannot be in the past",
      });
    }

    // End Date Check
    if (end < start) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    const difference = end.getTime() - start.getTime();

    const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;

    const totalPrice = totalDays * bike.rentPerDay;

    const booking = await Booking.create({
      user: req.user.id,
      bike: bikeId,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json({
      success: true,
      message: "Bike booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("bike");

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

// GET BIKE BOOKINGS
const getBikeBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      bike: req.params.bikeId,
      status: {
        $ne: "cancelled",
      },
    }).select("startDate endDate");

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
module.exports = {
  createBooking,
  getUserBookings,
  getBikeBookings,
};
