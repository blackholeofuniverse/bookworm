import express from 'express';
import { getBooks, createBook, deleteBook, getBooksByUser } from '../controllers/book.controller.js';
import protectRoute from '../middleware/auth.midleware.js';
const router = express.Router();

// create a new book
router.post('/', protectRoute, createBook);

// get all books
router.get('/', protectRoute, getBooks);

// get all books created by a user
router.get('/user', protectRoute, getBooksByUser);

// delete a book
router.delete('/:id', protectRoute, deleteBook);

export default router;