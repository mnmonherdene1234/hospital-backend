import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type BonusDocument = Bonus & Document;

export enum BonusType {
  Percent = 'PERCENT',
  Price = 'PRICE',
}

@Schema(transform)
export class Bonus extends BaseSchema {
  static schemaName: string = 'bonus';

  @Prop({
    required: true,
    enum: BonusType,
  })
  type: BonusType;

  @Prop({
    required: true,
    type: Number,
  })
  discount: number;

  @Prop({
    required: true,
    type: Number,
  })
  condition: number;
}

export const BonusSchema = SchemaFactory.createForClass(Bonus);
