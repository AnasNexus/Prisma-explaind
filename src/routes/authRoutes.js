import express from "express";
// Controller Import
import { register, login } from "../controller/authController.js";
// Create The Router
const router = express.Router();

// Set The Routes

router.post("/register", register);
router.post("/login", login);
