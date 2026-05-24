import {
  Link,
  useNavigate,
} from "react-router-dom";

const DashboardLayout = ({ children }) => {

  const navigate = useNavigate();

  // Get Logged User
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Logout Function
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="mb-10">

            <h1 className="text-4xl font-bold text-blue-400">
              FleetFlow
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Transport Management System
            </p>

          </div>

          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-xl mb-10">

            <p className="text-gray-400 text-sm">
              Logged in as
            </p>

            <h2 className="text-lg font-semibold">
              {user?.name || "Admin"}
            </h2>

          </div>

          {/* Navigation */}
          <ul className="space-y-4 text-lg">

            {/* Dashboard */}
            <li>

              <Link
                to="/"
                className="block bg-gray-800 hover:bg-blue-600 px-4 py-3 rounded-xl transition"
              >
                Dashboard
              </Link>

            </li>

            {/* Vehicles */}
            <li>

              <Link
                to="/vehicles"
                className="block bg-gray-800 hover:bg-blue-600 px-4 py-3 rounded-xl transition"
              >
                Vehicles
              </Link>

            </li>

            {/* Shipments */}
            <li>

              <Link
                to="/shipments"
                className="block bg-gray-800 hover:bg-blue-600 px-4 py-3 rounded-xl transition"
              >
                Shipments
              </Link>

            </li>

            {/* Workflow */}
            <li>

              <Link
                to="/workflow"
                className="block bg-gray-800 hover:bg-blue-600 px-4 py-3 rounded-xl transition"
              >
                Workflow
              </Link>

            </li>

          </ul>

        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;