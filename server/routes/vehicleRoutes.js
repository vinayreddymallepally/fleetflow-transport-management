const express = require("express");

const {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

// GET Vehicles
router.get("/", getVehicles);

// CREATE Vehicle
router.post("/", createVehicle);

// UPDATE Vehicle
router.put("/:id", updateVehicle);

// DELETE Vehicle
router.delete("/:id", deleteVehicle);

module.exports = router;