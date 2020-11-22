const admin = require("../middleware/admin");
const authorization = require("../middleware/authorization");
const express = require("express");
const router = express.Router();
const { Book } = require("../models/book");

//GET : Get All Books
router.get("/", authorization, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.send("Error found : " + err);
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

//POST : Issue a book
router.post("/:id", [authorization, admin], async (req, res) => {
  const issuedBook = await Book.findById(req.params.id, (err, doc) => {
    if (doc !== null) {
      if (doc.status === "Available") {
        doc.status = "Taken";
        const issued = doc.save();
        res.send("Book issued");
      } else {
        doc.status = "Available";
        const issued = doc.save();
        res.send("Book Returned");
      }
    }
    res.send("Book not found!");
  });
});

//GET : Search Book by ID
router.get("/:id", authorization, async (req, res) => {
  const searchBook = await Book.findById(req.params.id);
  res.json(searchBook);
});

module.exports = router;
