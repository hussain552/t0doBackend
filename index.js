import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import cors from "cors";
import mongoose from "mongoose";
import projectRoutes from "./API-Endpoints'/projectRoutes.js";


const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON data in requests


const PORT = process.env.PORT || 3000; 
const mongoDBURL = process.env.MONGO_DB_URL; // Use environment variable for MongoDB URL


app.use('/api', projectRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });
