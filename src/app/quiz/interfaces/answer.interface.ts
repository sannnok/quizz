export interface FieldProps {
  type: FieldType;
  options: AnswerOptionSelection[];
}

export enum FieldType {
  SELECT = 1,
  MULTISELECT,
  INPUT,
  NUMBERINPUT
}

export interface AnswerOption {
  answerId: number;
  value: string | number;
}

export type AnswerOptionSelection = AnswerOption & {
  isSelected?: boolean;
  correct?: boolean;
}
