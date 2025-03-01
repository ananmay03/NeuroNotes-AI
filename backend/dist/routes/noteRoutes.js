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
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router();
// Optional: Debug route to check if note routes are working
router.post("/debug", (req, res) => {
    console.log("Notes debug route hit");
    res.send("Notes debug route working");
});
// Create a note
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, noteController_1.createNote)(req, res);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get all notes
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, noteController_1.getNotes)(req, res);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Update a note by ID
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, noteController_1.updateNote)(req, res);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Delete a note by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, noteController_1.deleteNote)(req, res);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
