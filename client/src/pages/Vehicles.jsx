import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

const Vehicles = () => {

  // Vehicle State
  const [vehicles, setVehicles] = useState([]);

  // Edit State
  const [editingId, setEditingId] =
    useState(null);

  // Form State
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    vehicleType: "",
    capacity: "",
  });

  // Fetch Vehicles
  const fetchVehicles = async () => {
    try {

      const res = await axios.get(
        "https://fleetflow-backend-vdle.onrender.com/api/vehicles"
      );

      if (Array.isArray(res.data)) {
        setVehicles(res.data);
      } else {
        setVehicles([]);
      }

    } catch (error) {

      console.log("Fetch Error:", error);

      setVehicles([]);
    }
  };

  // Load Vehicles
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // UPDATE
      if (editingId) {

        await axios.put(
          `https://fleetflow-backend-vdle.onrender.com/api/vehicles/${editingId}`,
          formData
        );

        setEditingId(null);

      } else {

        // CREATE
        await axios.post(
          "https://fleetflow-backend-vdle.onrender.com/api/vehicles",
          formData
        );
      }

      // Refresh Data
      fetchVehicles();

      // Clear Form
      setFormData({
        vehicleNumber: "",
        driverName: "",
        vehicleType: "",
        capacity: "",
      });

    } catch (error) {

      console.log("Submit Error:", error);
    }
  };

  // Edit Vehicle
  const editVehicle = (vehicle) => {

    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      driverName: vehicle.driverName,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    });

    setEditingId(vehicle._id);
  };

  // Delete Vehicle
  const deleteVehicle = async (id) => {
    try {

      await axios.delete(
        `https://fleetflow-backend-vdle.onrender.com/api/vehicles/${id}`
      );

      fetchVehicles();

    } catch (error) {

      console.log("Delete Error:", error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Vehicle Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <button
          type="submit"
          className={`mt-5 text-white px-6 py-3 rounded-lg ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId
            ? "Update Vehicle"
            : "Add Vehicle"}
        </button>

      </form>

      {/* Vehicle Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Vehicle List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Vehicle No
              </th>

              <th className="text-left py-3">
                Driver
              </th>

              <th className="text-left py-3">
                Type
              </th>

              <th className="text-left py-3">
                Capacity
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {vehicles.length > 0 ? (

              vehicles.map((vehicle) => (

                <tr
                  key={vehicle._id}
                  className="border-b"
                >

                  <td className="py-4">
                    {vehicle.vehicleNumber}
                  </td>

                  <td>
                    {vehicle.driverName}
                  </td>

                  <td>
                    {vehicle.vehicleType}
                  </td>

                  <td>
                    {vehicle.capacity}
                  </td>

                  <td className="text-green-600 font-semibold">
                    {vehicle.status}
                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={() =>
                        editVehicle(vehicle)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteVehicle(vehicle._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No Vehicles Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default Vehicles;