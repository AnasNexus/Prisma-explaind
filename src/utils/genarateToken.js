import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
  const payalod = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payalod, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return token;
};

export default generateToken;
