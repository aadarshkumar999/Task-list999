import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiLogOut, FiCheckCircle } from "react-icons/fi";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setnewTodo] = useState("");
  

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/featch", {
          withCredentials: true,
        });
        setTodos(response.data.todos);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) return;

    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        { text: newTodo, completed: false },
        { withCredentials: true }
      );
      setTodos([...todos, response.data]);
      setnewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        { completed: !todo.completed },
        { withCredentials: true }
      );
      const updatedTodo = response.data.todo || response.data;
      setTodos(
        todos.map((t) =>
          t._id === id ? { ...t, completed: updatedTodo.completed } : t
        )
      );
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
      });
      toast.success("Logged out");
      localStorage.removeItem("jwt");
      navigateTo("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-500">Task List 📝</h1>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setnewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && todoCreate()}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={todoCreate}
            className="bg-cyan-500 text-white px-5 py-3 rounded-r-lg hover:bg-cyan-600 flex items-center"
          >
            <FiPlus className="mr-2" /> Add
          </button>
        </div>

        {loading ? (
          <div className="text-center text-green-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium">{error}</div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li
                  key={todo._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => todoStatus(todo._id)}
                      className="w-5 h-5 accent-cyan-500"
                    />
                    <span
                      className={`text-lg ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => todoDelete(todo._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        <div className="mt-6 text-center text-gray-600">
          <FiCheckCircle className="inline mr-2" />
          {todos.filter((todo) => !todo.completed).length} task
          {todos.filter((todo) => !todo.completed).length !== 1 ? "s" : ""} left
        </div>
      </div>
    </div>
  );
}
