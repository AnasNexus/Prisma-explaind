import express from "express";

import jwtauth from "../middleware/jwt_middleware.js";

import usersRoute from "./users.js";
import authrouter from "./authRoutes.js";
import postersRoute from "./postersRoutes.js";

const router = express.Router();

router.use("/users", jwtauth, usersRoute);
router.use("/auth", authrouter);
router.use("/posters", jwtauth, postersRoute);

export default router;
