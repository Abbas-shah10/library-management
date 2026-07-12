import { User } from '../models/associations.js'
import generateToken from "../utils/generateToken.js";
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

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "Member",
      member_id: member_id || null,
    });

    const { password: _, ...userData } = user.toJSON();

    res.status(400).json({ message: "Failed to create user" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Check your fields, something went wrong" });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         return res.status(200).json({
//             message: "User logged in successfully.",
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             token: generateToken(user._id),
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

// const addBookToUser = async (req, res) => {
//     try {
//         const { userId, title, description } = req.body;

//         if (!userId || !title || !description) {
//             return res.status(400).json({ message: "userId, title and description are required" });
//         }

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const book = await Books.create({
//             title,
//             description,
//             user: user._id,
//         });

//         user.books.push(book._id);
//         await user.save();

//         return res.status(201).json({
//             message: "Book added to user",
//             book,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

// const getBookByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         const allBooks = await User.findById(userId).select("-password").populate("books", "title description")

//         if (allBooks) {
//             return res.status(200).json({ message: "All Books fetched Successfully", allBooks })
//         } else {
//             return res.status(404).json({ message: "Books not found" })
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong" })
//     }
// }

export { registerUser }