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
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not Authorized as Admin' })
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Not authorized, requires role: ${roles.join(", ")}` })
    }

    next();
  }
}

export { authenticate, authorize };
