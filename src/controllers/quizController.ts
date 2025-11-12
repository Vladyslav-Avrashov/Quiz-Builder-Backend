import type { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { quizService } from '../services/quizService.js';

const createQuizController = async (req: Request, res: Response) => {
  const newQuiz = await quizService.addQuiz(req.body);
  res.status(201).json(newQuiz);
};

const getAllQuizzesController = async (req: Request, res: Response) => {
  const quizzes = await quizService.listQuizzes();
  res.status(200).json(quizzes);
};

const getQuizByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = await quizService.getQuiz(id!);

  if (!quiz) {
    throw createHttpError(404, 'Quiz not found');
  }

  res.status(200).json(quiz);
};

const deleteQuizController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedQuiz = await quizService.removeQuiz(id!);

  if (!deletedQuiz) {
    throw createHttpError(404, 'Quiz not found for deletion');
  }

  res.status(204).send();
};

export const createQuiz = ctrlWrapper(createQuizController);
export const getAllQuizzes = ctrlWrapper(getAllQuizzesController);
export const getQuizById = ctrlWrapper(getQuizByIdController);
export const deleteQuiz = ctrlWrapper(deleteQuizController);
