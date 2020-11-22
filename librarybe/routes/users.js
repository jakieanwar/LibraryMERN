const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

//POST : Add New User
router.post("/", async (req, res) => {
  const validation = await validateUser(req.body);
  // console.log(validation);
  if (validation.error != null) {
    return res.status(400).send("Some Bad Request Message");
  }

  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck != null) {
    return res
      .status(400)
      .json({ status: "Bad Request", message: "Email already registered" });
  }

  try {
    const user = new User(_.pick(req.body, ["email", "password", "role"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const saveResponse = await user.save();
    res.json(_.pick(saveResponse, ["email"]));
  } catch (err) {
    res.send("Error while saving..." + err);
  }
});

module.exports = router;
