import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface IQuiz extends Document {
  title: string;
  questions: IQuestion[];
}

const QuestionSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
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
