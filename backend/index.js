import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// add routes
import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";


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

const corsOptions = {
  origin: true,
  credentials: true,
};
// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);


// app running port
app.listen(port, () => {
  connect();
  console.log("Server Start on Port", port);
});
