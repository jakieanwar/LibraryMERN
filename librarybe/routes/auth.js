const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

//POST : Login
router.post("/", async (req, res) => {
  const validation = await validateCred(req.body);
  // console.log(validation);
  if (validation.error != null) {
    return res
      .status(400)
      .json({ status: "Bad Request", message: "Invalid email/password1" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res
      .status(400)
      .json({ status: "Bad Request", message: "Invalid email/password2" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ status: "Bad Request", message: "Invalid email/password3" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_PK
  );
  return res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .json({ status: "Success", email: user.email });
});

function validateCred(user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  let validation = schema.validate(user);
  return validation;
}

module.exports = router;
