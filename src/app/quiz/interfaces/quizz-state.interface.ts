import { Question } from "./question.interface";

export interface QuizzState {
  currentQuestionIndex: number;
  questions: Array<Question>;
  correctAnswerCount: number;
  showResults?: boolean;
}
