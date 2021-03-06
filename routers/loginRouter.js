const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SERVER_CODE;
const cookieParser = require("cookie-parser");
// USER MODEL
const User = require("../models/userModel");

const app = express();
app.use(express.json());
app.use(cookieParser());

router.get("/", (req, res) => {
  res.json({ message: "login router" });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  // verify that user with such email exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  // compare password with the hash from database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  //create token
  const token = jwt.sign({ id: user._id }, secret);
  // put token in the cookie
  res.cookie("jwt", token, { httpOnly: true, secure: false });
  // send cookie to the client
  res.json({
    message: "Here is your cookie",
  });
});

module.exports = router;
