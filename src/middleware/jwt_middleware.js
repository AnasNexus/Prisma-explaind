import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders && !authHeaders.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Or Expired Token" });
    }

    const token = authHeaders.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, message: "Token has expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Or Expired Token" });
    }
  }
};

export default auth;
