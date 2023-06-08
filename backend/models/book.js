// models/book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writer: { type: String, required: true },
  coverImage: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String }],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
