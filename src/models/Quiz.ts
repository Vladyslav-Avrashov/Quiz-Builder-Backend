import mongoose, { Document, Schema } from 'mongoose';

export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
}

export interface IQuestion {
  text: string;
  questionType: QuestionType;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerBoolean?: boolean;
  correctAnswerIndices?: number[];
}

export interface IQuiz extends Document {
  title: string;
  questions: IQuestion[];
}

const QuestionSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    questionType: {
      type: String,
      enum: Object.values(QuestionType),
      required: true,
    },
    options: [{ type: String }],
    correctAnswerIndex: { type: Number },
    correctAnswerBoolean: { type: Boolean },
    correctAnswerIndices: [{ type: Number }],
  },
  { _id: false },
);

const QuizSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    questions: [QuestionSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
