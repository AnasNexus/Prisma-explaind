import generateToken from "../utils/genarateToken.js";
import { prisma } from "../config/db.js";

const register = async (req, res) => {
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

    const token = generateToken(user, res);

    return res.status(201).json({
      success: true,
      user,
      token,
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
};

const login = async (req, res) => {
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
    const token = generateToken(user, res);
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    success: true,
  });
};

export { register, login, logout };
