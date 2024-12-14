import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoute.js";
import contactRoutes from "./controllers/ContactController.js";
import setupSocket from "./socket.js";
import messagesRoute from "./routes/MessagesRoute.js";
import ChannelRoutes from "./routes/ChannelRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

// Resolve the current directory
const _dirname = path.resolve();

// Implement CORS
const corsOptions = {
  origin: "https://chat-app-real-time.vecel.app", // Allow your frontend origin explicitly
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow cookies and other credentials
};
app.use(cors(corsOptions));

// Middleware
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoute);
app.use("/api/channel", ChannelRoutes);

// Get the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve Frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working fine!" });
});

// Start Server
const server = app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});

// Initialize Socket.IO with CORS configuration
setupSocket(server);

// Database Connection
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));
