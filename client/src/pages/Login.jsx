import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const API =
  "https://fleetflow-backend-vdle.onrender.com";

const Login = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        `${API}/api/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(
        "Login Successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold mb-3 text-center text-gray-800">
          FleetFlow
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Transport Management Login
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-5"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-5"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;