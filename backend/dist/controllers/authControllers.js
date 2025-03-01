"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock database (Replace this with a real database in the future)
const users = [];
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check if the username is already taken
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }
    // Hash the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Save the user (in memory for now)
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
});
exports.registerUser = registerUser;
// Log in an existing user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Find the user
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    // Verify the password
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
});
exports.loginUser = loginUser;
