const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const { post, route } = require("./loginRouter");

const secret = process.env.SERVER_CODE;

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  // console.log(data);
  req.data = data;
  next();
}

router.get("/", isLoggedIn, async (req, res) => {
  console.log(req.query);
  // const user = await User.findById(req.data.id).populate("contacts");
  const contacts = await Contact.find({ id: req.data.id });
  res.json({ data: contacts, nb: contacts.length });
});

router.post("/", isLoggedIn, async (req, res) => {
  let contact;
  try {
    contact = await Contact.create({
      userId: req.data.id,
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      category: req.body.category,
    });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "Contact created" });
});

router.put("/:id", isLoggedIn, async (req, res) => {
  let contact;
  try {
    contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "contact updated" });
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  let contact;
  try {
    contact = await Contact.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
  res.status(201).json({ message: "contact deleted" });
});

module.exports = router;
