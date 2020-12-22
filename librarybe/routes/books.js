const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const { Book } = require("../models/book");
const { Transaction } = require("../models/transaction");
const admin = require("../middleware/admin");
const authorization = require("../middleware/authorization");

//GET : Get All Books
router.get("/", authorization, async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({ message: "Books Not Found" });
  }
});

//POST : Add New Book
router.post("/", [authorization, admin], async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
    date: req.body.date,
    status: req.body.status,
  });

  try {
    const saveResponse = await book.save();
    res.json(saveResponse);
  } catch (err) {
    res.send("Error while saving..." + err);
  }
});

//PATCH : Update Book Details
router.patch("/:id", [authorization, admin], async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    console.log(book);
    book.name = req.body.name;
    book.author = req.body.author;
    book.price = req.body.price;
    const bookSaveRes = await book.save();
    res.json(bookSaveRes);
  } catch (err) {
    res.send("Bad Request");
  }
});

//Delete : Delete a book
router.delete("/:id", [authorization, admin], async (req, res) => {
  const deletedBook = await Book.findByIdAndRemove(
    req.params.id,
    (err, doc) => {
      if (doc === null) {
        res.send("Book not found");
      } else {
        res.send("Book Deleted");
      }
    }
  );
});

//GET : Search Book by Name
router.get("/search", authorization, async (req, res) => {
  const books = Book.find(
    {
      name: req.query.name,
    },
    (err, result) => {
      if (result) {
        res.json(result);
      } else {
        res.send("Not Found!");
      }
    }
  );
});

//POST : Issue Request
router.post("/issue/:id", authorization, async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const book = await Book.findById(req.params.id);
    if (book === undefined) {
      return res.status(400).json({ message: "Invalid Request" });
    }
  } else {
    return res.status(400).json({ message: "Invalid Request" });
  }
  const user = jwtDecode(req.header("x-auth-token"));
  const requestExist = await Transaction.find({
    book: req.params.id,
    status: "Pending",
    borrower: user.email,
  });
  if (requestExist.length !== 0) {
    return res.status(200).json({ message: "Book issue already requested" });
  }
  const transaction = new Transaction({
    borrower: user.email,
    book: req.params.id,
    issueDate: Date.now(),
  });
  try {
    const saveResponse = await transaction.save();
    res.json(saveResponse);
  } catch (err) {
    res.send("Error while saving..." + err);
  }
});

//POST : Issue a book
router.post("/:id", [authorization, admin], async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction === null || transaction.status === "Closed") {
    return res.status(400).json({ message: "Invalid Request" });
  }
  const book = await Book.findById(transaction.book);
  if (book !== null) {
    if (book.status === "Available") {
      book.status = "Taken";
      const issuedBook = await book.save();
      transaction.status = "Issued";
      const updateTransaction = await transaction.save();
      return res.status(200).json({
        message: `Book ${book.name} issued to ${transaction.borrower}`,
      });
    } else {
      book.status = "Available";
      const issued = await book.save();
      transaction.status = "Closed";
      const updateTransaction = await transaction.save();
      return res.status(200).json({ message: `Book ${book.name} Returned` });
    }
  }
  return res.status(404).json({ message: "Book not found!" });
});

//GET : Fetch Issue Requests
router.get("/issue", [authorization, admin], async (req, res) => {
  try {
    const transactions = await Transaction.find().where("status").ne("Closed");
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json({ message: `No Transactions ${err}` });
  }
});

//GET : Search Book by ID
router.get("/:id", authorization, async (req, res) => {
  const searchBook = await Book.findById(req.params.id);
  res.json(searchBook);
});

module.exports = router;
