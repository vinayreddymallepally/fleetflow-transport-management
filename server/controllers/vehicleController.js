const Vehicle = require("../models/Vehicle");

// GET Vehicles
const getVehicles = async (req, res) => {
  try {

    const vehicles = await Vehicle.find();

    res.json(vehicles);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE Vehicle
const createVehicle = async (req, res) => {
  try {

    const vehicle = new Vehicle(req.body);

    const savedVehicle = await vehicle.save();

    res.status(201).json(savedVehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Vehicle
const updateVehicle = async (req, res) => {
  try {

    const updatedVehicle =
      await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedVehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Vehicle
const deleteVehicle = async (req, res) => {
  try {

    await Vehicle.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Vehicle Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};