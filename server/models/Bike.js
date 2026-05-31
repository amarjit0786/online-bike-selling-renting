const mongoose = require("mongoose");

const currentYear = new Date().getFullYear();

const bikeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 2000,
      max: currentYear + 1,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 1,
    },

    rentPerDay: {
      type: Number,
      required: [true, "Rent per day is required"],
      min: 1,
    },

    category: {
      type: String,
      enum: ["Sports", "Cruiser", "Electric", "Scooter"],
      required: [true, "Category is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 20,
      maxlength: 2000,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Bike", bikeSchema);
