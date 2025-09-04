import express from "express";
import cors from "cors";
import driversRouter from "./routes/drivers";
import usersRouter from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/drivers", driversRouter);
app.use("/api/users", usersRouter);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || "Internal Server Error" });
});

export default app;
