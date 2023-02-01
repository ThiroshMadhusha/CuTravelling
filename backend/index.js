import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// database connection
// terminal eke extra display query hide karanna "strikeQuery" add karai
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Database Connected..!");
  } catch (error) {
    console.log("Oops..! MongoDb Database Connected Fail.");
  }
};

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/tours", tourRoute);

// app running port
app.listen(port, () => {
  connect();
  console.log("Server Start on Port", port);
});
