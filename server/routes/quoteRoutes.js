import express from 'express';
import { getQuotes } from '../controllers/quoteController.js';

const router = express.Router();

router.get('/', getQuotes);

export default router;
