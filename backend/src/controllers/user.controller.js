import { RefreshToken, User } from '../models/associations.js'
import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, member_id } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User exists with the same email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      role: role || "Member",
    };
    if (member_id) {
      newUser.member_id = member_id;
    }

    const user = await User.create(newUser);

    const accessToken = generateToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);

    const { password: _, ...userData } = user.toJSON();

    res.status(201).json({ message: "User created successfully", user: userData, accessToken, refreshToken });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Check your fields, something went wrong" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const accessToken = generateToken(user.id);
      const refreshToken = await generateRefreshToken(user.id);

      const { password: _, ...userData } = user.toJSON();

      res.status(201).json({ message: "User Logged In successfully", user: userData, accessToken, refreshToken });

    }


  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const deleted = await RefreshToken.destroy({
      where: {
        token_hash: tokenHash,
        revoked_at: null,
      },
    });

    if (!deleted) {
      return res.status(400).json({ message: "Invalid or already revoked token" });
    }

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

export { registerUser, loginUser, logoutUser }