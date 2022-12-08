import { QuestionData } from 'src/schemas/question.schema';

export class QuestionDto {
  title: string;
  questions: QuestionData[];

  created_by: string;
  updated_by: string;
}
