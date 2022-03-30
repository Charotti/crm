const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "contact router" });
});
module.exports = router;
