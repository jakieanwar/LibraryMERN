// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: false,
//   },
//   date: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     required: true,
//     default: "Available",
//   },
// });

// module.exports = mongoose.model("Book", bookSchema);
/* --------------------------------------------------*/
const Joi = require("joi");
const mongoose = require("mongoose");

const Book = new mongoose.model(
  "Book",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      default: "Available",
    },
  })
);

function validateBook(book) {
  const schema = {
    name: Joi.string().min(1).required(),
    author: Joi.string.min(1).required(),
    price: Joi.number(),
    date: Joi.required(),
    status: Joi.string().required(),
  };

  return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validateBook = validateBook;
