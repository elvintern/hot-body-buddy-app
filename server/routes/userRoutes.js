import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', getUser);
router.post('/signup', createUser);

export default router;
