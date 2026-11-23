import express from "express";
import { prisma } from "../config/db.js";
// Controller Import
import { register, login } from "../controller/authController.js";
import { getUsersController } from "../controller/usersController.js";

// Create The Router
const router = express.Router();

router.get("/get-users", getUsersController);

// Export the Router
export default router;
