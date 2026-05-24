const Vehicle = require("../models/Vehicle");
const Shipment = require("../models/Shipment");

const getDashboardStats = async (req, res) => {
  try {

    const totalVehicles = await Vehicle.countDocuments();

    const totalShipments =
      await Shipment.countDocuments();

    const deliveredShipments =
      await Shipment.countDocuments({
        status: "Delivered",
      });

    const pendingShipments =
      await Shipment.countDocuments({
        status: "Pending",
      });

    res.json({
      totalVehicles,
      totalShipments,
      deliveredShipments,
      pendingShipments,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};