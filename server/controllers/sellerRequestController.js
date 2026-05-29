const SellerRequest = require("../models/SellerRequest");
const User = require("../models/User");

// CREATE REQUEST
const createSellerRequest = async (req, res) => {
  try {
    const existing = await SellerRequest.findOne({
      user: req.user.id,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({
        message: "Request already exists",
      });
    }

    const request = await SellerRequest.create({
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL REQUESTS

const getAllRequests = async (req, res) => {
  try {
    const requests = await SellerRequest.find().populate(
      "user",
      "name email role",
    );

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// APPROVE REQUEST

const approveRequest = async (req, res) => {
  try {
    const request = await SellerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "approved";

    await request.save();

    await User.findByIdAndUpdate(request.user, {
      role: "seller",
    });

    res.status(200).json({
      success: true,
      message: "Seller approved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REJECT REQUEST

const rejectRequest = async (req, res) => {
  try {
    const request = await SellerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "rejected";

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSellerRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
};
