import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  FaTruck,
  FaBox,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalShipments: 0,
    deliveredShipments: 0,
    pendingShipments: 0,
  });

  // Chart Data
  const chartData = [
    {
      name: "Delivered",
      value: stats.deliveredShipments,
    },
    {
      name: "Pending",
      value: stats.pendingShipments,
    },
  ];

  // Chart Colors
  const COLORS = [
    "#22c55e",
    "#facc15",
  ];

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "https://fleetflow-backend-vdle.onrender.com/api/dashboard"
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

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          FleetFlow Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor vehicles, shipments and logistics
          operations in real-time.
        </p>

      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        {/* Vehicles */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg">
                Total Vehicles
              </h2>

              <p className="text-5xl font-bold mt-3">
                {stats.totalVehicles}
              </p>

            </div>

            <FaTruck size={50} />

          </div>

        </div>

        {/* Shipments */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg">
                Shipments
              </h2>

              <p className="text-5xl font-bold mt-3">
                {stats.totalShipments}
              </p>

            </div>

            <FaBox size={50} />

          </div>

        </div>

        {/* Delivered */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg">
                Delivered
              </h2>

              <p className="text-5xl font-bold mt-3">
                {stats.deliveredShipments}
              </p>

            </div>

            <FaCheckCircle size={50} />

          </div>

        </div>

        {/* Pending */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg">
                Pending
              </h2>

              <p className="text-5xl font-bold mt-3">
                {stats.pendingShipments}
              </p>

            </div>

            <FaClock size={50} />

          </div>

        </div>

      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* Left Card */}
        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Logistics Performance
          </h2>

          <p className="text-gray-600 leading-8">
            FleetFlow helps manage transport operations,
            shipment tracking, and fleet monitoring
            efficiently with real-time updates and
            analytics dashboards.
          </p>

        </div>

        {/* Right Card */}
        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            System Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Total Vehicles</span>

              <span className="font-bold">
                {stats.totalVehicles}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Shipments</span>

              <span className="font-bold">
                {stats.totalShipments}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivered</span>

              <span className="font-bold text-green-600">
                {stats.deliveredShipments}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>

              <span className="font-bold text-yellow-600">
                {stats.pendingShipments}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-2xl shadow mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Shipment Analytics
        </h2>

        <div className="h-[400px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={140}
                label
              >

                {chartData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;