import Quiz from '../models/Quiz.js';
import type { IQuiz } from '../models/Quiz.js';

const addQuiz = (data: Partial<IQuiz>) => {
  return Quiz.create(data);
};

const listQuizzes = () => {
  return Quiz.aggregate([
    {
      $project: {
        _id: 1,
        title: 1,
        questionCount: { $size: '$questions' },
      },
    },
  ]);
};

const getQuiz = (id: string) => {
  return Quiz.findById(id);
};

const removeQuiz = (id: string) => {
  return Quiz.findByIdAndDelete(id);
};

export const quizService = {
  addQuiz,
  listQuizzes,
  getQuiz,
  removeQuiz,
};
