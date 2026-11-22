require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT;

// routers

const usersRoute = require("./routes/users");

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
