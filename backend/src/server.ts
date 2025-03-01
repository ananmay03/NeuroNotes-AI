import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Root route for server check
app.get("/", (req, res) => {
  res.send("NeuroNotes Backend is Running...");
});

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Mount note management routes
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
