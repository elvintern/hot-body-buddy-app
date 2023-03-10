import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getUserInfo,
  updateRoutines,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', getUser);
router.post('/profile', getUserInfo);
router.post('/sign-up', createUser);
router.post('/routine', updateRoutines);

export default router;
