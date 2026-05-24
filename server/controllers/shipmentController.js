const Shipment = require("../models/Shipment");

const Vehicle = require("../models/Vehicle");

// GET Shipments
const getShipments = async (req, res) => {
  try {

    const shipments = await Shipment.find();

    res.json(shipments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE Shipment
const createShipment = async (req, res) => {
  try {

    const shipment =
      new Shipment(req.body);

    const savedShipment =
      await shipment.save();

    // Make Vehicle Busy
    await Vehicle.findOneAndUpdate(
      {
        vehicleNumber:
          req.body.assignedVehicle,
      },
      {
        status: "Busy",
      }
    );

    res.status(201).json(
      savedShipment
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Shipment Status
const updateShipmentStatus = async (
  req,
  res
) => {
  try {

    const shipment =
      await Shipment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    // If Delivered
    if (
      req.body.status === "Delivered"
    ) {

      await Vehicle.findOneAndUpdate(
        {
          vehicleNumber:
            shipment.assignedVehicle,
        },
        {
          status: "Available",
        }
      );
    }

    res.json(shipment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE Shipment
const deleteShipment = async (
  req,
  res
) => {
  try {

    const shipment =
      await Shipment.findById(req.params.id);

    // Vehicle Available Again
    await Vehicle.findOneAndUpdate(
      {
        vehicleNumber:
          shipment.assignedVehicle,
      },
      {
        status: "Available",
      }
    );

    await Shipment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Shipment Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getShipments,
  createShipment,
  updateShipmentStatus,
  deleteShipment,
};