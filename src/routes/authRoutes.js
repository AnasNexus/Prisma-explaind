import express from "express";
// Controller Import
import { register, login, logout } from "../controller/authController.js";
// Create The Router
const router = express.Router();

// Validators
import ValidateRiquest from "../middleware/authValidatorMW.js";
import LoginSchema from "../schemas/authValidators.js";
// Set The Routes

router.post("/register", register);
router.post("/login", ValidateRiquest(LoginSchema), login);
router.post("/logout", logout);
export default router;
