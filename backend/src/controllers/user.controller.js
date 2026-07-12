import { User } from '../models/associations.js'
import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import bcrypt from 'bcrypt'

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

      res.status(201).json({ message: "User created successfully", user: userData, accessToken, refreshToken });

    }


  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}



export { registerUser, loginUser }