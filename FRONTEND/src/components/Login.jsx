import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://task-list999-2.onrender.com/user/login",
        {
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

      // First store the token
      localStorage.setItem("jwt", data.token);

      // Clear the form
      setEmail("");
      setPassword("");

      // Show success message
      toast.success("Login successful", {
        duration: 2000,
      });

      // Wait for toast to show before navigating
      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg p-6 text-gray-900">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Login
          </h3>
        </div>
        <form className="flex flex-col gap-4 p-6" onSubmit={handleLogin}>
          <div className="relative h-11 w-full">
            <input
              type="email"
              placeholder="Enter Email"
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative h-11 w-full">
            <input
              type="password"
              placeholder="Enter Password"
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-700">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-cyan-500/40"
          >
            Login
          </button>
          <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
