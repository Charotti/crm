const express = require("express");
const router = express.Router();
const secret = process.env.SERVER_CODE;

router.get("/", (req, res) => {
  res.json({ message: "contact router" });
});
module.exports = router;
