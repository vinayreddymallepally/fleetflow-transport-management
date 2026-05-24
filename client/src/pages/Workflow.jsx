import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

const Workflow = () => {

  const [shipments, setShipments] =
    useState([]);

  // Fetch Shipments
  const fetchShipments = async () => {
    try {

      const res = await axios.get(
        "https://fleetflow-backend-vdle.onrender.com/api/shipments"
      );

      setShipments(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  // Update Status
  const updateStatus = async (
    id,
    status
  ) => {
    try {

      await axios.put(
        `https://fleetflow-backend-vdle.onrender.com/api/shipments/${id}`,
        { status }
      );

      fetchShipments();

    } catch (error) {

      console.log(error);
    }
  };

  // Filter
  const pendingShipments =
    shipments.filter(
      (s) => s.status === "Pending"
    );

  const transitShipments =
    shipments.filter(
      (s) => s.status === "In Transit"
    );

  const deliveredShipments =
    shipments.filter(
      (s) => s.status === "Delivered"
    );

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-10">
        Shipment Workflow Board
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {/* Pending */}
        <div className="bg-yellow-100 p-5 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Pending
          </h2>

          <div className="space-y-4">

            {pendingShipments.map(
              (shipment) => (

                <div
                  key={shipment._id}
                  className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-lg">
                    {shipment.shipmentId}
                  </h3>

                  <p>
                    {shipment.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {shipment.destination}
                  </p>

                  <button
                    onClick={() =>
                      updateStatus(
                        shipment._id,
                        "In Transit"
                      )
                    }
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Move to Transit
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* Transit */}
        <div className="bg-blue-100 p-5 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            In Transit
          </h2>

          <div className="space-y-4">

            {transitShipments.map(
              (shipment) => (

                <div
                  key={shipment._id}
                  className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-lg">
                    {shipment.shipmentId}
                  </h3>

                  <p>
                    {shipment.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {shipment.destination}
                  </p>

                  <button
                    onClick={() =>
                      updateStatus(
                        shipment._id,
                        "Delivered"
                      )
                    }
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Mark Delivered
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* Delivered */}
        <div className="bg-green-100 p-5 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Delivered
          </h2>

          <div className="space-y-4">

            {deliveredShipments.map(
              (shipment) => (

                <div
                  key={shipment._id}
                  className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-lg">
                    {shipment.shipmentId}
                  </h3>

                  <p>
                    {shipment.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {shipment.destination}
                  </p>

                  <p className="mt-4 text-green-600 font-bold">
                    Completed
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Workflow;