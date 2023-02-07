import { FieldProps } from "./answer.interface";

export interface Question {
  name: string;
  fieldProps: FieldProps;
  correctAnswer: Array<number>;
}
