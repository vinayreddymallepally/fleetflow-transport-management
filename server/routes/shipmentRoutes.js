const express = require("express");

const {
  getShipments,
  createShipment,
  updateShipmentStatus,
  deleteShipment,
} = require("../controllers/shipmentController");

const router = express.Router();

// GET Shipments
router.get("/", getShipments);

// CREATE Shipment
router.post("/", createShipment);

// UPDATE Shipment Status
router.put("/:id", updateShipmentStatus);

// DELETE Shipment
router.delete("/:id", deleteShipment);

module.exports = router;