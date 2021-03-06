const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = process.env.SERVER_CODE;

router.get("/", (req, res) => {
  res.json({ message: "register router" });
});

// POST A USER
router.post("/", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      contacts: req.body.contacts,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "User created" });
});

module.exports = router;
