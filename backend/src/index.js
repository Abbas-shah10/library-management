import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
// Utils
import sequelize from "./db/connectDb.js";
import { memberRoutes, userRoutes, bookRoutes, loanRoutes, authorRoutes, fineRoutes, reservationRoutes, categoryRoutes, reportRoutes } from "./routes/index.js";
import { runOverdueCheck } from "./services/overdueService.js";
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
app.use("/api/v1/loans", loanRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use("/api/v1/fines", fineRoutes)
app.use("/api/v1/reservations", reservationRoutes)
app.use("/api/v1/categories", categoryRoutes)
app.use("/api/v1/reports", reportRoutes)

const OVERDUE_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;

app.listen(PORT, () => {
  console.log(`App is listening on port : ${PORT}`);
  setTimeout(async () => {
    try {
      const result = await runOverdueCheck();
      console.log(`[OVERDUE JOB] ${result.marked} marked overdue, ${result.emailed} email(s) sent`);
    } catch (error) {
      console.error("[OVERDUE JOB] Failed:", error.message);
    }
  }, 5000);
  setInterval(async () => {
    try {
      await runOverdueCheck();
    } catch (error) {
      console.error("[OVERDUE JOB] Failed:", error.message);
    }
  }, OVERDUE_CHECK_INTERVAL_MS);
  console.log("Overdue check job scheduled (every 6 hours)");
});
