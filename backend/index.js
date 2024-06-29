const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// Increase the body size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);



const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  // if server is connected to database then run the server
  app.listen(PORT, () => {
    console.log("Connected to DB...");
    console.log("Server is running...");
  });
});
