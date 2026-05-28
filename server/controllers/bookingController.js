const Booking = require("../models/Booking");

const Bike = require("../models/Bike");


// CREATE BOOKING
const createBooking = async (req, res) => {
  try {

    const { bikeId, startDate, endDate } = req.body;


    // FIND BIKE
    const bike = await Bike.findById(bikeId);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }


    // CALCULATE DAYS
    const start = new Date(startDate);

    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    const totalDays =
      Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;


    // TOTAL PRICE
    const totalPrice =
      totalDays * bike.rentPerDay;


    // CREATE BOOKING
    const booking = await Booking.create({
      user: req.user.id,
      bike: bikeId,
      startDate,
      endDate,
      totalDays,
      totalPrice,
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
    })
      .populate("bike");



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
};