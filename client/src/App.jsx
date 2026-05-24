import {
  Routes,
  Route,
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Shipments from "./pages/Shipments";
import Workflow from "./pages/Workflow";
import Login from "./pages/Login";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* Login Route */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Vehicles */}
      <Route
        path="/vehicles"
        element={
          <ProtectedRoute>
            <Vehicles />
          </ProtectedRoute>
        }
      />

      {/* Shipments */}
      <Route
        path="/shipments"
        element={
          <ProtectedRoute>
            <Shipments />
          </ProtectedRoute>
        }
      />

      {/* Workflow Board */}
      <Route
        path="/workflow"
        element={
          <ProtectedRoute>
            <Workflow />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}

export default App;