const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: Number,
  title: String,
  name: String,
  author: String,
  ISBN: String,
});

const Book = mongoose.model("books-details", bookSchema);
module.exports = Book;
