const express = require("express");
const {
  getBooks,
  getUserBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all books
router.get("/", getBooks);

// require auth for all bookRoutes
router.use(requireAuth);

// GET all books
router.get("/getusers", getUserBooks);

// GET a single book
router.get("/:id", getBook);

// POST a single book
router.post("/", createBook);

// DELETE a single book
router.delete("/:id", deleteBook);

// UPDATE a single books
router.put("/:id", updateBook);

module.exports = router;
