const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    assignedVehicle: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Shipment",
  shipmentSchema
);