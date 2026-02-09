import express from "express";
import cors from "cors";
import "dotenv/config";
import accountsRouter from "./routes/accounts.routes";
import repsRouter from "./routes/reps.routes";


import dealsRouter from "./routes/deals.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

// middleware base
app.use(cors());
app.use(express.json());

// health check
app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "RevOps API is running",
    endpoints: ["/health", "/accounts", "/deals", "/reps"],
  });
});


// routes
app.use("/deals", dealsRouter);
app.use("/accounts", accountsRouter);

app.use("/reps", repsRouter);

// error middleware (SEMPRE per ultimo)
app.use(errorMiddleware);



export default app;
