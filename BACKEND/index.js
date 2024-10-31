import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
//import router from "../BACKEND/routes/todo.route.js";
import cookieParser from "cookie-parser";

import todoRoute from "../BACKEND/routes/todo.route.js"
import userRoute from "../BACKEND/routes/user.route.js"

const app = express()

dotenv.config();

const PORT = process.env.PORT || 4002

const DB_URL = process.env.MONGODB_URL

//middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors ({
  origin:process.env.FORNTEND_URL,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], 
}))

//database conection 
try {
   await mongoose.connect(DB_URL)
    console.log("Connecte to mongoDb");
    
} catch (error) {
    console.log(`'MongoDB connection error:`, error);
    
}

//routes 

app.use("/todo", todoRoute);

app.use("/user", userRoute);

// app.get('/', (req, res) => {
//   res.send('Hello Worlwd!')
// })

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})