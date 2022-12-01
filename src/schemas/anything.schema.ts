import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseSchema } from './utils/base.schema';
import transform from './utils/transform';

export type AnythingDocument = Anything & Document;

@Schema(transform)
export class Anything extends BaseSchema {
  static schemaName: string = 'anything';

  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  any: any;
}

export const AnythingSchema = SchemaFactory.createForClass(Anything);
