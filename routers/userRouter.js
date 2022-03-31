const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = process.env.SERVER_CODE;
const User = require("../models/userModel");

router.delete("/user/:id", async (req, res) => {
  if (isAdmin === true) {
    try {
      contact = await Contact.findByIdAndDelete(req.params.id);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
    res.status(201).json({ message: "contact deleted" });
  } else {
    res.status(403).json({ message: "you are not allowed" });
  }
});

module.exports = router;
