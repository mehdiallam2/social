import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.mjs";
import usersRoutes from "./routes/users.route.mjs";
import postsRoutes from "./routes/posts.route.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure express
app.use(express.static("public"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors({ origin: "http://localhost:5173", credentials: true, optionSuccessStatus: 200 }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

// Listen for requests
app.listen(PORT, () => console.log("Listening on port " + PORT));
