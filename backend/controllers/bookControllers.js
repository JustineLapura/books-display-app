const mongoose = require("mongoose");
const Book = require("../models/booksModel");

// GET books
const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  res.status(200).json(books);
};

// GET User books
const getUserBooks = async (req, res) => {
  const user_id = req.user._id;
  const books = await Book.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(books);
};

// GET a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(400).json({ error: "book not found" });
  }
  res.status(200).json(book);
};

// POST a new document
const createBook = async (req, res) => {
  const { title, author, publishYear } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!publishYear) {
    emptyFields.push("publishYear");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const book = await Book.create({ title, author, publishYear, user_id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such book" });
  }

  const book = await Book.findById({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "book not found" });
  }

  const user_id = req.user._id;

  // Check if the user trying to delete the book is the owner
  if (user_id.toString() !== book.user_id.toString()) {
    return res.status(400).json({ error: "You can only delete your own book" });
  }

  // If the ownership check passed, proceed to delete the book
  const deleteBook = await Book.findByIdAndDelete({ _id: id });

  if (!deleteBook) {
    return res.status(400).json({ error: "Failed to delete a book" });
  }

  res.status(200).json({ mssg: "Book deleted successfully!" });
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such book" });
  }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!publishYear) {
    emptyFields.push("publishYear");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }


  const updatedBook = await Book.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedBook) {
    return res.status(400).json({ error: "book not found" });
  }

  res.status(200).json({ mssg: "Book updated successfully!", updatedBook });
};

module.exports = {
  getBooks,
  getUserBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
