import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getUserInfo,
  updateRoutines,
  updateRoutine,
  deleteRoutine,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', getUser);
router.post('/profile', getUserInfo);
router.post('/sign-up', createUser);
router.post('/routine', updateRoutines);
router.post('/routine/update', updateRoutine);
router.post('/routine/delete', deleteRoutine);

export default router;
