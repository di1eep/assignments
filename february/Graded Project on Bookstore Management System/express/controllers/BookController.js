const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const { title, author, ISBN, price, quantity } = req.body;

    // Create a new book
    const newBook = new Book({ title, author, ISBN, price, quantity });
    await newBook.save();

    res.json({ success: true, message: 'Book added successfully.', bookId: newBook._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find();
    res.json({ success: true, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    // Retrieve a single book by ID from the database
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }

    res.json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, price } = req.body;

    // Update book information
    await Book.findByIdAndUpdate(req.params.bookId, { title, price });

    res.json({ success: true, message: 'Book updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    // Delete a book by ID from the database
    await Book.findByIdAndDelete(req.params.bookId);

    res.json({ success: true, message: 'Book deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    // Create a new review
    const newReview = new Review({ comment, rating, bookId: req.params.bookId });
    await newReview.save();

    res.json({ success: true, message: 'Review added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    // Search for books by title in the database
    const books = await Book.find({ title: { $regex: query, $options: 'i' } });
    res.json({ success: true, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
