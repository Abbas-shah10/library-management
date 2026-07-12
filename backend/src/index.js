import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
// Utils
import sequelize from "./db/connectDb.js";
import userRoutes from './routes/user.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
}))


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Db connected Successfully")
    await sequelize.sync({ alter: true });
    console.log("All models synchronized")
  } catch (error) {
    console.error(error);
  }
}
await startServer()

app.use("/api/v1/users", userRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port : ${PORT}`);
});
