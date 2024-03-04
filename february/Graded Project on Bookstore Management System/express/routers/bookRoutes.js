const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.post('/', authenticateMiddleware, BookController.addBook);
router.get('/', BookController.getAllBooks);
router.get('/:bookId', BookController.getSingleBook);
router.put('/:bookId', authenticateMiddleware, BookController.updateBook);
router.delete('/:bookId', authenticateMiddleware, BookController.deleteBook);
router.post('/:bookId/reviews', authenticateMiddleware, BookController.addReview);
router.get('/search', BookController.searchBooks);

module.exports = router;
