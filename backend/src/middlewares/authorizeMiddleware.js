import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

const authenticate = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      })
      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, author not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user?.role === 'Admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not Authorized as Admin' })
  }
}

export { authenticate, isAdmin };
