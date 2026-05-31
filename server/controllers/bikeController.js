const Bike = require("../models/Bike");

// ADD BIKE
const addBike = async (req, res) => {
  try {
    const {
      title,
      brand,
      model,
      year,
      price,
      rentPerDay,
      category,
      description,
      image,
    } = req.body;

    const currentYear = new Date().getFullYear();

    if (
      !title ||
      !brand ||
      !model ||
      !year ||
      !price ||
      !rentPerDay ||
      !category ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (title.trim().length < 3) {
      return res.status(400).json({
        message: "Title must be at least 3 characters",
      });
    }

    if (Number(year) < 2000 || Number(year) > currentYear + 1) {
      return res.status(400).json({
        message: `Year must be between 2000 and ${currentYear + 1}`,
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (Number(rentPerDay) <= 0) {
      return res.status(400).json({
        message: "Rent per day must be greater than 0",
      });
    }

    if (description.trim().length < 20) {
      return res.status(400).json({
        message: "Description must be at least 20 characters",
      });
    }

    const bike = await Bike.create({
      title: title.trim(),
      brand: brand.trim(),
      model: model.trim(),
      year,
      price,
      rentPerDay,
      category: category.trim(),
      description: description.trim(),
      image,
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

// GET ALL BIKES
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

// GET SINGLE BIKE
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

// UPDATE BIKE
const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    if (bike.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const { title, price, rentPerDay, year, description } = req.body;

    const currentYear = new Date().getFullYear();

    if (title && title.trim().length < 3) {
      return res.status(400).json({
        message: "Title must be at least 3 characters",
      });
    }

    if (year && (Number(year) < 2000 || Number(year) > currentYear + 1)) {
      return res.status(400).json({
        message: `Year must be between 2000 and ${currentYear + 1}`,
      });
    }

    if (price && Number(price) <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (rentPerDay && Number(rentPerDay) <= 0) {
      return res.status(400).json({
        message: "Rent per day must be greater than 0",
      });
    }

    if (description && description.trim().length < 20) {
      return res.status(400).json({
        message: "Description must be at least 20 characters",
      });
    }

    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Bike updated successfully",
      bike: updatedBike,
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
      seller: req.user.id,
    });

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

module.exports = {
  addBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
  getSellerBikes,
};
