import express from "express";
import { config } from "dotenv";

import { connectDB } from "./config/db.js";

// import Routes
import MainAPIRouter from "./routes/mainRoutes.js";

// ENV Config Function:
config();

const app = express();
const PORT = process.env.PORT;

// routers

app.use("/api", MainAPIRouter);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// server Start Function
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, async () => {
      console.log(`Server IS running On : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
