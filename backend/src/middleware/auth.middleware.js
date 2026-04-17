import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized - Token invalid" });
  }
};