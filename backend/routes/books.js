// routes/books.js

const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// Create Book
router.post("/book", async (req, res) => {
  try {
    const { title, writer, coverImage, price, tags } = req.body;

    // Validate input data
    if (!title || !writer || !coverImage || !price || !tags) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new user
    const newBook = new Book({
      title,
      writer,
      coverImage,
      price,
      tags,
    });

    await newBook.save();
    res.status(201).json({ message: "Create successful", data: newBook });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single book by ID
router.get("/book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ... Implement other API endpoints (order, cancel order, list of buys, etc.)

module.exports = router;
