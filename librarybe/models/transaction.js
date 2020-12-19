const Joi = require("joi");
const mongoose = require("mongoose");

const Transaction = new mongoose.model(
  "Transaction",
  new mongoose.Schema({
    borrower: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: false,
    },
    book: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  })
);

function validateTransaction(transaction) {
  const schema = {
    borrower: Joi.string().min(1).required(),
    issuer: Joi.string.min(1).required(),
    book: Joi.string(),
    issueDate: Joi.date().required(),
    returnDate: Joi.date().required(),
    status: Joi.string().required(),
  };

  return Joi.validate(transaction, schema);
}

exports.Transaction = Transaction;
exports.validateTransaction = validateTransaction;
