import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodos } from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create",authenticate, createTodo);

router.get("/featch",authenticate, getTodos);
router.put("/update/:id",authenticate, updateTodos)
router.delete("/delete/:id",authenticate, deleteTodo)


export default router;