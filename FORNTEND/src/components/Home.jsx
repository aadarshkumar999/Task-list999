import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';


export default function Home() {

    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newTodo, setnewTodo] = useState("");

    useEffect(() => {
        const fetchtodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:4001/todo/featch", {
                    withCredentials: true
                });
                console.log(response.data.todos);
                setTodos(response.data.todos);
                
            } catch (error) {
                setError("Failed to fetch todos");
            } finally {
                setLoading(false);
            }
        };
        fetchtodos();
    }, []);

    // const todoCreate = async () => {
    //     if (!newTodo) return;
    //     try {
    //         const response = await axios.post("http://localhost:4001/todo/create", {
    //             text: newTodo,
    //             completed: false,
    //            
    //         }, {
    //             withCredentials: true
    //         });
    //         setTodos([...todos, response.data]);
    //         setnewTodo(""); // Clear input field after adding
    //     } catch (error) {
    //         setError("Failed to create todo");
    //     }
    // };

    const todoCreate = async () => { //edit
        if (!newTodo) return;
    
        try {
            const response = await axios.post(
                "http://localhost:4001/todo/create",
                { text: newTodo, completed: false },
                { withCredentials: true }
            );
    
            setTodos([...todos, response.data]);
            setnewTodo(""); // Clear input field after adding
        } catch (error) {
            setError("Failed to create todo");
            console.error("Error creating todo:", error);
        }
    };
    

    // const todoStatus = async (id) => {
    //     const todo = todos.find((t) => t._id === id);
    //     if (!todo) return;

    //     try {
    //         const response = await axios.put(`http://localhost:4001/todo/update/${id}`, {
    //             completed: !todo.completed
    //         }, {
    //             withCredentials: true
    //         });
    //         console.log(response.data);
    //         setTodos(todos.map((t) =>
    //             t._id === id ? { ...t, completed: response.data.todo.completed } : t
    //         ));
            
            
    //     } catch (error) {
    //         setError("Failed to update todo status");
    //         console.log(error);
            
    //     }
    // };

    //edit

    const todoStatus = async (id) => {
        const todo = todos.find((t) => t._id === id);
        if (!todo) return;
    
        try {
            const response = await axios.put(
                `http://localhost:4001/todo/update/${id}`,
                { completed: !todo.completed },
                { withCredentials: true }
            );
    
            // Check if response contains the updated todo or a success indicator
            const updatedTodo = response.data.todo || response.data;
            console.log(updatedTodo);
    
            setTodos(todos.map((t) =>
                t._id === id ? { ...t, completed: updatedTodo.completed } : t
            ));
        } catch (error) {
            setError("Failed to update todo status");
            console.error(error); // Log the error for more insight
        }
    };
    
    const todoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4001/todo/delete/${id}`, { withCredentials: true });
            setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            setError("Failed to delete todo");
        }
    };

    const navigateTo = useNavigate();
    const logout =async ()=>{
        try {
            await axios.get("http://localhost:4001/user/logout",{
                withCredentials: true,
            });
            toast.success("User logged out successfully");
            // <Navigate to={"/login"}/>
            navigateTo("/login")
            localStorage.removeItem("jwt");
           
        } catch (error) {
            toast.error("Error Logging out")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className='bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:max-auto p-6'>
                <h1 className='text-2xl font-semibold text-center mb-4'>Task Management</h1>
                <div className='flex mb-4'>
                    <input
                        type="text"
                        placeholder='Add a new task'
                        className='flex-grow p-2 border rounded-l-md focus:outline-none'
                        value={newTodo}
                        onChange={(e) => setnewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && todoCreate()}
                    />
                    
                    <button
                        onClick={todoCreate}
                        className='bg-cyan-500 border rounded-r-md text-white px-4 py-2 hover:bg-blue-800 duration-300'
                    > Add
                    </button>
                </div>
                {loading?( <div className='text-center text-green-500'><span >Loading
                    </span> </div>):error?( <div className='text-center text-red-600 font-semibold'>{error} </div>):(

              
                <ul className='space-y-2'>
                    {todos.map((todo) => (
                        <li key={todo._id} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => todoStatus(todo._id)} // Pass todo._id here
                                    className='mr-2'
                                />
                                <span className={`text-gray-800 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
                            </div>
                            <button
                                onClick={() => todoDelete(todo._id)}
                                className='text-red-500 hover:text-red-800 duration-300'
                            >  Delete
                            </button>
                        </li>
                    ))}
                </ul>
                  )}

                <p className='mt-4 text-center text-gray-500'>
                    {todos.filter(todo => !todo.completed).length} Todo{todos.filter(todo => !todo.completed).length !== 1 ? 's' : ''} Remaining
                </p>
                <button onClick={logout} className='mt-6 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-red-700 duration-500 mx-auto block'>
                    Logout
                </button>
            </div>
        </div>
    );
}
