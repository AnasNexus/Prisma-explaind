import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";

config();

const app = express();
const PORT = process.env.PORT;

// routers
import usersRoute from "./routes/users.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/users", usersRoute);

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
