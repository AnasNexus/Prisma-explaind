import express from "express";

import {
  add_poster,
  del_poster,
  upd_poster,
  updp_poster,
} from "../controller/postersController.js";

const router = express.Router();

// Routes :
// Add Poster
router.post("/add-poster", add_poster);
// Update Poster
router.put("/upd-poster", del_poster);
// Delete Poster
router.delete("/del-poster", upd_poster);
// Update One Coloumn In the Poster
router.patch("/updp-poster", updp_poster);

export default router;
