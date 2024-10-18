
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
import cors from "cors";
import productRoutes from "./Routes/productRoutes.js";

// Initialize dotenv to read environment variables
dotenv.config();

// Initialize Express
const app = express();

// CORS Middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.mongo_uri)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Connection error", err));

// Use product routes
app.use("/api", productRoutes);

if(process.env.NODE_ENV === "production"){
  console.log("inside")
  const dirPath=path.resolve();
  app.use(express.static("frontend/dist"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,"frontend","dist","index.html"))
  })
}



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
