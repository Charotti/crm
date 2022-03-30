const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
  });
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });


app.listen(8001, () => console.log("Listening..."));