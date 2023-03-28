import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  getUserInfo,
  updateRoutines,
  updateRoutine,
  updatePerformance,
  deleteRoutine,
  fetchRoutine,
  increaseTotalCount,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', getUser);
router.post('/profile', getUserInfo);
router.post('/profile/update', increaseTotalCount);
router.post('/workout', fetchRoutine);
router.post('/sign-up', createUser);
router.post('/routine', updateRoutines);
router.post('/routine/update', updateRoutine);
router.post('/routine/delete', deleteRoutine);
router.post('/routine/result', updatePerformance);

export default router;
