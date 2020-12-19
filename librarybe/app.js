const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const cors = require("cors");

const dbURL = process.env.DB_URL;

const app = express();

mongoose.connect(dbURL, { useNewUrlParser: true });
const dbCon = mongoose.connection;

dbCon.on("open", () => {
  console.log("Database connected...");
});

app.use(express.json());
app.use(cors());

const booksRouter = require("./routes/books");
app.use("/library/books", booksRouter);
const usersRouter = require("./routes/users");
app.use("/library/users", usersRouter);
const authRouter = require("./routes/auth");
app.use("/library/users/auth", authRouter);

app.listen(process.env.PORT || 9000, () => {
  console.log("Server started on port 9000");
});
