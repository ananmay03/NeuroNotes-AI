import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

// Debug route to confirm the router is loaded
router.post("/debug", (req: Request, res: Response) => {
  console.log("Debug route hit");
  res.send("Debug route working");
});

// Registration Route
router.post("/register", async (req: Request, res: Response) => {
  try {
    await registerUser(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    await loginUser(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
