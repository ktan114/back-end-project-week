const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const noteRouter = require("./notes/noteRoutes");
const userRouter = require("./users/userRoutes");

// Initialize Server
const server = express();

// Connect to mlab
const mongoDB = process.env.MONGOURI;
mongoose
  .connect(mongoDB)
  .then(connect => {
    console.log("Connected!");
  })
  .catch(err => {
    console.log("Not connected");
  });

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Routes
server.use("/notes", noteRouter);
// server.use("/users", userRouter);

// Connect to port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port: ${port}`));