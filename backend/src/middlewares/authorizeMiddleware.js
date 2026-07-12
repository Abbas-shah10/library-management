// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// const authenticate = async (req, res, next) => {
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       const token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       const user = await User.findById(decoded.id).select("-password");
//       if (!user) {
//         return res
//           .status(401)
//           .json({ message: "Not authorized, author not found" });
//       }

//       // Check if token was issued before last logout
//       if (
//         user.loggedOutAt &&
//         user.loggedOutAt.getTime() / 1000 > decoded.iat
//       ) {
//         return res
//           .status(401)
//           .json({ message: "Not authorized, token revoked" });
//       }
//       req.user = user;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
// };

// const isAdmin = async (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Not Authorized as Admin' })
//   }
// }

// export { authenticate, isAdmin };
