import { useEffect, useState } from "react";

import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

const API =
  "https://fleetflow-backend-vdle.onrender.com";

const Dashboard = () => {

  const [stats, setStats] =
    useState({
      totalVehicles: 0,
      totalShipments: 0,
      deliveredShipments: 0,
      pendingShipments: 0,
    });

  // Fetch Stats
  const fetchStats = async () => {
    try {

      const res = await axios.get(
        `${API}/api/dashboard`
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-10">
        FleetFlow Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow">
          <h2>Total Vehicles</h2>

          <p className="text-5xl font-bold mt-4">
            {stats.totalVehicles}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
          <h2>Shipments</h2>

          <p className="text-5xl font-bold mt-4">
            {stats.totalShipments}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
          <h2>Delivered</h2>

          <p className="text-5xl font-bold mt-4">
            {stats.deliveredShipments}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">
          <h2>Pending</h2>

          <p className="text-5xl font-bold mt-4">
            {stats.pendingShipments}
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;