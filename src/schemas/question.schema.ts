import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type QuestionDocument = Question & Document;

export enum QuestionType {
  Text = 'TEXT',
  Radio = 'RADIO',
  Image = 'IMAGE',
}

export class QuestionData {
  label: string;
  type: QuestionType;
  options: string[];
  data: any;
}

@Schema(transform)
export class Question extends BaseSchema {
  static schemaName: string = 'questions';

  @Prop({
    type: String,
  })
  title: string;

  @Prop(raw(QuestionData))
  questions: QuestionData[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
