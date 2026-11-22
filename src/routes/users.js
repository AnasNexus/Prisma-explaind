const express = require("express");
const router = express.Router();

const prisma = require("../config/db");

router.get("/get-users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    console.log("users : ", users);

    res.status(200).json({ success: true, count: users.length, users: users });
  } catch (error) {
    console.error("err", error);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
