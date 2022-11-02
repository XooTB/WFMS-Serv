// Module Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { requireAuth } from "./middleware/requireAuth.js";

//Route Imports
import users from "./routes/users.js";
import login from "./routes/login.js";
import test from "./routes/test.js";
import order from "./routes/orderRoutes.js";

//Config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Connecting to DB
mongoose.connect(process.env.MONGO_URL).catch((err) => {
  console.log("Something went wrong while connecting to the DB.", err.message);
});

//All the API Endpoints

app.use("/api/test", test);
app.use("/api/users", requireAuth, users);
app.use("/api/login", login);
app.use("/api/order", order);

//All the Routes

// All of the Random Undefined Endpoints that'll Send an 404 or 500 Error

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: res.status,
    message: "Invalid Path, Please Check again.",
  });
});

export default app;
