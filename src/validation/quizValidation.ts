import Joi from 'joi';
import { QuestionType } from '../models/Quiz.js';

const optionsSchema = Joi.array().items(Joi.string().required()).min(2);

const singleChoiceSchema = Joi.object({
  text: Joi.string().required(),
  questionType: Joi.string().valid(QuestionType.SINGLE_CHOICE).required(),
  options: optionsSchema.required(),
  correctAnswerIndex: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref('options', { adjust: (v) => (v ? v.length - 1 : 0) }))
    .required(),
});

const multipleChoiceSchema = Joi.object({
  text: Joi.string().required(),
  questionType: Joi.string().valid(QuestionType.MULTIPLE_CHOICE).required(),
  options: optionsSchema.required(),
  correctAnswerIndices: Joi.array()
    .items(
      Joi.number()
        .integer()
        .min(0)
        .max(
          Joi.ref('options', {
            ancestor: 2,
            adjust: (v) => (v ? v.length - 1 : 0),
          }),
        ),
    )
    .min(1)
    .unique()
    .required(),
});

const booleanSchema = Joi.object({
  text: Joi.string().required(),
  questionType: Joi.string().valid(QuestionType.BOOLEAN).required(),
  correctAnswerBoolean: Joi.boolean().required(),
});

const inputSchema = Joi.object({
  text: Joi.string().required(),
  questionType: Joi.string().valid(QuestionType.INPUT).required(),
});

export const createQuizSchema = Joi.object({
  title: Joi.string().min(3).required(),
  questions: Joi.array()
    .items(
      Joi.alternatives().try(
        singleChoiceSchema,
        multipleChoiceSchema,
        booleanSchema,
        inputSchema,
      ),
    )
    .min(1)
    .required(),
});
