import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// A simple in-memory user store (replace with a database in production)
const users: { username: string; password: string }[] = [];

// Function to handle user registration
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Check if the username already exists
  if (users.find(user => user.username === username)) {
    res.status(400).json({ message: "Username already exists" });
    return;
  }

  // Hash the password and save the user
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

// Function to handle user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Find the user in the store
  const user = users.find(user => user.username === username);
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // Verify the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ message: "Logged in successfully", token });
};
