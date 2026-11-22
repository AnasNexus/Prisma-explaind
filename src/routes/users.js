const express = require("express");
const router = express.Router();

const { prisma } = require("../config/db");

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

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, msg: "Bad Requist" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: password,
      },
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, msg: "Bad Requist" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ name: username }, { email: username }],
      },
    });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid username OR password" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

module.exports = router;
