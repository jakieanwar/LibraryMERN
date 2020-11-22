const { ValidationError } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().default("user"),
  });
  let validation = schema.validate(user);
  return validation;
}

const User = new mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
