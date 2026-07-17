import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
// Utils
import sequelize from "./db/connectDb.js";
import { memberRoutes, userRoutes, bookRoutes } from "./routes/index.js";
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
    await sequelize.sync();
    console.log("All models synchronized")
  } catch (error) {
    console.error(error);
  }
}
await startServer()

app.use("/api/v1/users", userRoutes)
app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/members', memberRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port : ${PORT}`);
});
