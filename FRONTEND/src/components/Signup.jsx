import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://task-list999-2.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "Signup successful");
      navigateTo("/login");
      localStorage.setItem("jwt", data.token);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User already registred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg p-6 text-gray-900">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 text-center"
        >
          <span className="text-2xl font-semibold">Sign up</span>
          <span className="text-sm text-gray-600">
            Create a free account with your email.
          </span>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col gap-4">
            <input
              type="text"
              className="input bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              className="input bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-500 transition ease-in-out duration-300"
          >
            Sign up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-700 bg-blue-100 p-4 rounded-b-lg shadow-inner">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-cyan-700 hover:text-blue-500 transition"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
