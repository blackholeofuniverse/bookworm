import express from 'express';
import { getBooks, createBook } from '../controllers/book.controller.js';
import protectRoute from '../middleware/auth.midleware.js';
const router = express.Router();

router.post('/', protectRoute, createBook);

export default router;