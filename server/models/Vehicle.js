const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Vehicle",
  vehicleSchema
);