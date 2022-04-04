const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;

// ROUTERS
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");
const contactRouter = require("./routers/contactRouter");
const userRouter = require("./routers/userRouter");

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
// MONGODB
const mongoose = require("mongoose");
const router = require("./routers/contactRouter");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTES
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/contacts", contactRouter);
app.use("/user", userRouter);

//LOGOUT
app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "Vous êtes déconnectée" });
});

app.listen(port, () => console.log(`listening on port: ${port}`));
