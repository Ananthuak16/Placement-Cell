// Importing required modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Loading environment variables from .env file
dotenv.config();

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    console.log("db connecting...");
    console.log("mongo uri=", process.env.mongoURL); // Logging MongoDB URI

    // Establishing connection to MongoDB using mongoose
    const res = await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`mongodb connected with server ${res.connection.host}`);
  } catch (error) {
    console.log("mongodb connection failed!");
    console.log(error);
  }
};
