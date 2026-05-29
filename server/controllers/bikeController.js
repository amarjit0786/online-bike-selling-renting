const Bike = require("../models/Bike");

// Add bike

const addBike = async (req, res) => {
  try {
    const bike = await Bike.create({
      ...req.body,
      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Bike added successfully",
      bike,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all bikes

const getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate("seller", "name email");

    res.status(200).json({
      success: true,
      bikes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single bike

const getSingleBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id).populate(
      "seller",
      "name email",
    );

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      bike,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update bike

const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    // Check seller ownership
    if (bike.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Bike updated successfully",
      updatedBike,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE BIKE
const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    // Check seller ownership
    if (bike.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await bike.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bike deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SELLER BIKES
const getSellerBikes = async (req, res) => {

  try {

    const bikes = await Bike.find({
      seller: req.user.id
    });

    res.status(200).json({
      success: true,
      bikes
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {addBike, getAllBikes, getSingleBike, updateBike, deleteBike,getSellerBikes};