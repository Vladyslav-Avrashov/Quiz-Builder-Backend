import { Router } from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from '../controllers/quizController.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../utils/validateBody.js';
import { createQuizSchema } from '../validation/quizValidation.js';

const router = Router();

router.post('/', validateBody(createQuizSchema), createQuiz);

router.get('/', getAllQuizzes);

router.get('/:id', isValidId, getQuizById);

router.delete('/:id', isValidId, deleteQuiz);

export default router;
