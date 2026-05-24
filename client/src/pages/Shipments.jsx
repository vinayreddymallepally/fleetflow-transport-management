import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

const Shipments = () => {

  const [shipments, setShipments] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // Edit State
  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      shipmentId: "",
      productName: "",
      source: "",
      destination: "",
      assignedVehicle: "",
    });

  // Fetch Shipments
  const fetchShipments = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/shipments"
      );

      setShipments(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch shipments"
      );
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Filter Shipments
  const filteredShipments =
    shipments.filter((shipment) =>
      shipment.shipmentId
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      shipment.productName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      shipment.destination
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

  // Add / Update Shipment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // UPDATE
      if (editingId) {

        await axios.put(
          `http://localhost:5000/api/shipments/${editingId}`,
          formData
        );

        toast.success(
          "Shipment Updated"
        );

        setEditingId(null);

      } else {

        // CREATE
        await axios.post(
          "http://localhost:5000/api/shipments",
          formData
        );

        toast.success(
          "Shipment Added"
        );
      }

      fetchShipments();

      // Reset Form
      setFormData({
        shipmentId: "",
        productName: "",
        source: "",
        destination: "",
        assignedVehicle: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        "Operation Failed"
      );
    }
  };

  // Edit Shipment
  const editShipment = (shipment) => {

    setFormData({
      shipmentId: shipment.shipmentId,
      productName: shipment.productName,
      source: shipment.source,
      destination: shipment.destination,
      assignedVehicle:
        shipment.assignedVehicle,
    });

    setEditingId(shipment._id);
  };

  // Delete Shipment
  const deleteShipment = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/shipments/${id}`
      );

      toast.success(
        "Shipment Deleted"
      );

      fetchShipments();

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
        Shipment Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow mb-10"
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="shipmentId"
            placeholder="Shipment ID"
            value={formData.shipmentId}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            name="assignedVehicle"
            placeholder="Assigned Vehicle"
            value={formData.assignedVehicle}
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
            ? "Update Shipment"
            : "Add Shipment"}
        </button>

      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Shipments..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded-xl mb-6 w-full"
      />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Shipment List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Shipment ID
              </th>

              <th className="py-3 text-left">
                Product
              </th>

              <th className="py-3 text-left">
                Source
              </th>

              <th className="py-3 text-left">
                Destination
              </th>

              <th className="py-3 text-left">
                Vehicle
              </th>

              <th className="py-3 text-left">
                Created
              </th>

              <th className="py-3 text-left">
                Status
              </th>

              <th className="py-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredShipments.map((shipment) => (

              <tr
                key={shipment._id}
                className="border-b"
              >

                <td className="py-4">
                  {shipment.shipmentId}
                </td>

                <td>
                  {shipment.productName}
                </td>

                <td>
                  {shipment.source}
                </td>

                <td>
                  {shipment.destination}
                </td>

                <td>
                  {shipment.assignedVehicle}
                </td>

                <td>
                  {new Date(
                    shipment.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      shipment.status ===
                      "Pending"
                        ? "bg-yellow-100 text-yellow-700"

                        : shipment.status ===
                          "In Transit"
                        ? "bg-blue-100 text-blue-700"

                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {shipment.status}
                  </span>

                </td>

                <td className="space-x-2">

                  {/* Edit Only Pending */}
                  {shipment.status ===
                    "Pending" && (

                    <button
                      onClick={() =>
                        editShipment(shipment)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                  )}

                  <button
                    onClick={() =>
                      deleteShipment(shipment._id)
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

export default Shipments;