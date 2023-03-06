import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getUserInfo,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', getUser);
router.post('/profile', getUserInfo);
router.post('/signup', createUser);

export default router;
