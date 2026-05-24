import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

const API =
  "https://fleetflow-backend-vdle.onrender.com";

const Vehicles = () => {

  const [vehicles, setVehicles] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      vehicleNumber: "",
      driverName: "",
      vehicleType: "",
      capacity: "",
    });

  // Fetch Vehicles
  const fetchVehicles = async () => {
    try {

      const res = await axios.get(
        `${API}/api/vehicles`
      );

      if (Array.isArray(res.data)) {
        setVehicles(res.data);
      } else {
        setVehicles([]);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch vehicles"
      );
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Filter
  const filteredVehicles =
    vehicles.filter((vehicle) =>
      vehicle.vehicleNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      vehicle.driverName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      vehicle.vehicleType
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `${API}/api/vehicles/${editingId}`,
          formData
        );

        toast.success(
          "Vehicle Updated"
        );

        setEditingId(null);

      } else {

        await axios.post(
          `${API}/api/vehicles`,
          formData
        );

        toast.success(
          "Vehicle Added"
        );
      }

      fetchVehicles();

      setFormData({
        vehicleNumber: "",
        driverName: "",
        vehicleType: "",
        capacity: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Operation Failed"
      );
    }
  };

  // Edit
  const editVehicle = (vehicle) => {

    setFormData({
      vehicleNumber: vehicle.vehicleNumber,
      driverName: vehicle.driverName,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    });

    setEditingId(vehicle._id);
  };

  // Delete
  const deleteVehicle = async (id) => {
    try {

      await axios.delete(
        `${API}/api/vehicles/${id}`
      );

      toast.success(
        "Vehicle Deleted"
      );

      fetchVehicles();

    } catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
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
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

        </div>

        <button
          type="submit"
          className={`mt-5 text-white px-6 py-3 rounded-xl ${
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

      {/* Search */}
      <input
        type="text"
        placeholder="Search Vehicles..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-xl mb-6 w-full"
      />

      {/* Table */}
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

            {filteredVehicles.map((vehicle) => (

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

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      vehicle.status ===
                      "Busy"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {vehicle.status}
                  </span>

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

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default Vehicles;