import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

const API =
  "https://fleetflow-backend-vdle.onrender.com";

const Shipments = () => {

  const [shipments, setShipments] =
    useState([]);

  const [search, setSearch] =
    useState("");

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
        `${API}/api/shipments`
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

  // Filter
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

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `${API}/api/shipments/${editingId}`,
          formData
        );

        toast.success(
          "Shipment Updated"
        );

        setEditingId(null);

      } else {

        await axios.post(
          `${API}/api/shipments`,
          formData
        );

        toast.success(
          "Shipment Added"
        );
      }

      fetchShipments();

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

  // Edit
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

  // Delete
  const deleteShipment = async (id) => {
    try {

      await axios.delete(
        `${API}/api/shipments/${id}`
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

    </DashboardLayout>
  );
};

export default Shipments;