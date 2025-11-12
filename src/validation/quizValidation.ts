import Joi from 'joi';

const questionSchema = Joi.object({
  text: Joi.string().min(3).required().messages({
    'string.empty': '"text" cannot be empty',
    'string.min': '"text" must be at least 3 characters long',
    'any.required': '"text" is a required field',
  }),

  options: Joi.array()
    .items(Joi.string().required())
    .min(2)
    .required()
    .messages({
      'array.base': '"options" must be an array',
      'array.min': '"options" must contain at least 2 items',
      'any.required': '"options" is a required field',
    }),

  correctAnswerIndex: Joi.number().integer().min(0).required().messages({
    'number.base': '"correctAnswerIndex" must be a number',
    'number.min': '"correctAnswerIndex" must be at least 0',
    'any.required': '"correctAnswerIndex" is a required field',
  }),
});

export const createQuizSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.empty': '"title" cannot be empty',
    'string.min': '"title" must be at least 3 characters long',
    'any.required': '"title" is a required field',
  }),

  questions: Joi.array().items(questionSchema).min(1).required().messages({
    'array.base': '"questions" must be an array',
    'array.min': '"questions" must contain at least 1 question',
    'any.required': '"questions" is a required field',
  }),
});
